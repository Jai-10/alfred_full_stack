const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'))
app.use(cors())


mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://jai:jai@cluster0.3wvybhi.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log('Connected to the DB'))
    .catch(err => console.log(err))




// routes
const authRoute = require('./api/routes/auth');

app.use('/auth', authRoute)



app.use((req, res) => {
    res.status(404).json({ message: "The page you are looking for does not exist" })
})


module.exports = app;