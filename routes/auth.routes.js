const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const dotenv = require('dotenv')

dotenv.config()

const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Incorrect data for registration"})
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "Such a user already register"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email: email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: "The user was successfully created"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

router.post('/login',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Incorrect data for login"})
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const result = await bcrypt.compare(password, user.password)

        if (!result) {
            return res.status(400).json({message: "Incorrect password"})
        }

        let token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        res.status(200).json({token, userId: user._id})
    } catch {
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

module.exports = router