const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const expressLayouts = require('express-layouts')
const bcrypt = require('bcrypt');
const cors = require('cors');
const {
    readF,
    writeF
} = require('./model/data')


// we just use an array as db 
var users = readF('./model/data.json')

const saltRound = 13 //The number of rounds determines the complexity of the hash
const app = express();
app.use(express.json()) // parsing the body
app.use(cors())
app.set('view engine', 'ejs') //set ejs as view engine

app.use(express.static('public')) //for serving static path

app.use(expressLayouts) // for using ejs layouts
// for logging requests
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Register-Page',
        layout: './layouts/my-layout'
    })
})

app.post('/register', async (req, res) => {
    let registerdUser = req.body;
    let matched = users.find(user => user.email === registerdUser.email);
    if (!matched) {
        let hashPass = await bcrypt.hash(registerdUser.password, saltRound)
        registerdUser = {
            email: registerdUser.email,
            userHashPass: hashPass,
            _id: new Date.now()
        }
        users.push(registerdUser)
        writeF('./model/data.json', JSON.stringify(users))
    } else {
        res.status(200)
            .send({
                error: {
                    code: 400,
                    message: "Email already used"
                }
            })
    }
})

app.listen(process.env.PORT, () => console.log(`Server is running at ${process.env.PORT}`))