const express = require('express')
const cors = require ('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/app', (req, res) => {
    let userid = req.body.userid
    let company = req.body.company
    let seeComp = req.body.seeComp
    let jobTitle = req.body.jobTitle
    let seeJob = req.body.seeJob
    let date = Date.now()
    

    console.log(userid)
    res.json({message: 'okay'})

})

app.get('/', (req, res) => {
    res.json({message: 'working'})
})

app.listen(8080, () => {
    console.log('Ready to be HAPPY about Sadness...')
})