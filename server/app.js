const express = require('express')
const cors = require ('cors')
const models = require('./models')
const { Op } = require('sequelize')

const app = express()

app.use(express.json())
app.use(cors())


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

app.get('/', (req, res) => {
    res.json({message: 'working'})
})

app.listen(8080, () => {
    console.log('Ready to be HAPPY about Sadness...')
})