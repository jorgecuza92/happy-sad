const express = require('express')
const cors = require ('cors')
const models = require('./models')
const { Op } = require('sequelize')
var bcrypt = require("bcryptjs");
const { sequelize } = require('./models');


const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    bcrypt.genSalt(10, function (error,salt){
        bcrypt.hash(password, salt, function(error, hash){
            if(!error){
                let newUser = models.User.build({
                    username: username,
                    password: hash,
                    email: email
                })
                newUser.save((error)=>{
                    if(error){
                     res.json({ error: "Unable to Register!" });
                    }else{
                     res.json({ success: true, message: "Saved new User" });
                    }
                })
            } else {
             res.json({ success: false });

            }
        })
    })  
})


app.post('/app', (req, res) => {
    let userid = req.body.userId
    let company = req.body.company
    let seeComp = req.body.seeComp
    let jobTitle = req.body.title
    let seeJob = req.body.seeJob
    let date = Date.now()
    
    let newApp = models.Application.build({
        user_id: userid,
        company: company,
        title: jobTitle
    }) 

    newApp.save().then((savedApp) => {
        res.json ({
            success: true
        })
    })
    

})

app.get('/feed/:page', (req, res) => {

    let page = req.params.page

    models.Application.findOne({
        order: [
            ['id', 'DESC']
        ]
    })
    .then(result => {
        let offset = page * 10
        models.Application.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset: offset, limit: 10
        }) .then(apps => {
            res.json(apps)
        })
    })
})


app.get('/', (req, res) => {
    res.json({message: 'working'})
})

app.listen(8080, () => {
    console.log('Ready to be HAPPY about Sadness...')
})