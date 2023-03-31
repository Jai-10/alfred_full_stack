const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();


router.get('/login', (req, res) => {
    res.status(200).json({ message: "/login" })
})


router.get('/signup', (req, res) => {
    res.status(200).json({ message: "/signup" })
})


module.exports = router;