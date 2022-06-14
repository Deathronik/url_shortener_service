const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const dotenv = require('dotenv')
const shortid = require("shortid");
const Link = require('../models/Link')

dotenv.config()

const router = Router()

router.post('/create', auth,
    check("link", "Incorrect link format").isURL(),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Incorrect data for create short link"})
            }

            const {link} = req.body
            const {userId} = req.user

            const code = shortid.generate()
            const existing = await Link.findOne({code})

            if (existing) {
                res.status(400).json({message: "Such a short link already exists"})
            }

            const shortLink = new Link({owner: userId, code, from: process.env.BASE_URL + `/s/${code}`, to: link})

            await shortLink.save()

            res.status(201).json({message: "The short link was successfully created"})
        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again"})
        }
    })

router.get('/', auth, async (req, res) => {
    try {
        const {userId} = req.user
        const links = await Link.find({owner: userId})

        res.status(200).json({links: links})
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const {userId} = req.user

        const link = await Link.findOne({code: req.params.id, owner: userId})

        res.status(200).json({link: link})
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const {userId} = req.user
        await Link.deleteOne({code: req.params.id, owner: userId})

        res.status(200).json({message: "The short link was successfully deleted"})
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

module.exports = router