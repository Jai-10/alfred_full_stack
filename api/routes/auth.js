const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const AlfredUser = require('../models/AlfredUser')
const verify = require('../authVerify');
const { default: mongoose } = require('mongoose');

const loginSchema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().min(6).required()
})


// login
router.post('/login', async (req, res) => {
    try {
        const {error} = await loginSchema.validateAsync(req.body);
    } catch(error) {
        res.status(400).json({ error: error })
    }

    const user = await AlfredUser.findOne({ email : req.body.email})
    if(!user) {
        res.status(400).json({ message: "Incorrect email id" })
        return;
    }

    const validPass = bcrypt.compare(req.body.password, user.password)
    if (validPass) {
        const token = jwt.sign({_id:user._id, email: user.email}, `${process.env.Token_Secret}`)
        res.header("auth-token", token).json({ token: token })
        user.token = token;
    }
    else {
        res.status(400).json({ message: "invalid password" })
    }
})






const signupSchema = joi.object({
    email : joi.string().required().email().max(20),
    password : joi.string().required().min(6),
    name : joi.string().required().max(20),
    phoneNumber : joi.string().required().length(10),
    city : joi.string().required().max(20)
})


// signup
router.post('/signup', async (req, res) => {
    const emailExist = await AlfredUser.findOne({ email : req.body.email })

    if (emailExist) {
        res.status(400).json({ message: "Email Id already exists" })
        return;
    }
    try {
        const {error} = await signupSchema.validateAsync(req.body);
        if(!error) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const user = new AlfredUser({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPass,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                city: req.body.city
            })
            const result = await user.save();
            res.status(201).json({ result: result })
        }
    } catch(error) {
        res.status(500).json({message : 'error occured', err : error})
    }
})


module.exports = router;