
const express = require('express')
const cors = require('cors')
const models = require('./models')
const { Op } = require('sequelize')
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize } = require('./models');


const app = express()

app.use(express.json())
app.use(cors())



app.post('/register', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(password, salt, function (error, hash) {
            if (!error) {
                let newUser = models.User.build({
                    username: username,
                    password: hash,
                    email: email
                })
                newUser.save((error) => {
                    if (error) {
                        res.json({ error: "Unable to Register!" });
                    } else {
                        res.json({ success: true, message: "Saved new User" });
                    }
                })
            } else {
                res.json({ success: false });

            }
        })
    })
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  models.User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          var token = jwt.sign({ username: username }, "KRABBYPATTYFORMULA");
          console.log(result)
          res.json({ success: true, userId: user.id, token: token, username: username });
        } else {
          res.json({
            success: false,
            message: "username and/or password invalid.",
          });
        }
      });
    })
    .catch((error) => {
      res.json({ success: false, message: "User not found in database." });
    });
});


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
        res.json({
            success: true
        })
    })


})

app.get('/emoji/:data', (req, res) => {
    //http://localhost:8080/emoji/1,2,80,heart 1 is sender, 2, is user, 80 is application, heart is emoji
    let data = req.params.data
    let string = data.split(",")
    //This is the User ID for the sender of the emoji
    let sender = string[0]
    //This is the User ID of the recipient
    let user = string[1]
    let application = string[2]
    let emoji = string[3]

    console.log(data)


    //Updating the count in the Application Table
    models.Application.update({
        [emoji]: sequelize.literal(`${emoji} + 1`)
    }, {
        where: {
            id: application
        }
    })

    //update the count in the User Table
    models.User.update({
        [emoji]: sequelize.literal(`${emoji} + 1`)
    }, {
        where: {
            id: user
        }
    })

    //Still need MongoDB database for user sending emoji

    res.json({life: 'continues'})


})

app.get('/feed/:page', (req, res) => {

    let page = req.params.page
    let offset = page * 10

    models.Application.findAll({
        order: [
            ['id', 'DESC']
        ],
        offset: offset, limit: 10
    }).then(apps => {
        res.json(apps)
    })

})


app.get('/', (req, res) => {
    res.json({ message: 'working' })
})

app.listen(8080, () => {
    console.log('Ready to be HAPPY about Sadness...')
})
