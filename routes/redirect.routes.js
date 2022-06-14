const {Router} = require('express')
const dotenv = require('dotenv')
const Link = require('../models/Link')

dotenv.config()

const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params

        const link = await Link.findOne({code: id})

        if (!link) {
            return res.status(400).json({message: "Link not found"})
        }

        link.clicks += 1

        await link.save()
        res.redirect(link.to)
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

module.exports = router