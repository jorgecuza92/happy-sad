const express = require("express");
const cors = require("cors");
const models = require("./models");
const { Op } = require("sequelize");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./models");
const formidable = require("formidable");
const mongoose = require("mongoose");
const EmojiItem = require("./schemas/emoji");
const User = require("./schemas/user");
const { v4: uuidv4 } = require("uuid");
const { nextTick } = require("node:process");
const user = require("./models/user");

const app = express();

app.use(express.json());
app.use(cors());

// static folder for images
app.use("/uploads", express.static("uploads"));



app.post("/upload", (req, res) => {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFilename = `${uuidv4()}.${file.name.split(".").pop()}`;
      file.path = __dirname + "/uploads/" + uniqueFilename;
    })
    .on("file", (name, file) => {
      let url = `http://localhost:8080/uploads/${uniqueFilename}`;
      console.log(url);
      res.json({ file: url });
    });
});

app.post("/update", (req, res) => {
  let userId = req.body.userId;
  let url = req.body.imageUpload;

  console.log(url)
  let body = req.body;
  console.log(userId);
  models.User.update(
    {
      profileImage: url,
    },
    {
      where: {
        id: userId,
      },
    }
  ).then(updatedUser => {
      console.log(updatedUser)
  })

  res.json(body);
});

app.get("/dashboard", (req, res) => {
  uploadImage(req, (photoURL) => {});
});

mongoose.connect(
  "mongodb+srv://mikewarren:money@cluster0.k39ds.mongodb.net/happy-sad?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("Successfully connected to MongoDB");
    } else {
      console.log(error);
    }
  }
);

app.post("/emoji-add", (req, res) => {
  const applicationId = req.body.app;
  const userId = req.body.userId;
  const grinning = req.body.grinning;
  const tada = req.body.tada;
  const heart = req.body.heart;
  const raised_hands = req.body.hands;

  const application = new Application({
    application_id: applicationId,
    raised_hands: raised_hands,
    tada: tada,
    heart: heart,
    grinning: grinning,
  });

  // var newUser = new User ({
  //     id: userId
  // })
  // newUser.save()

  // User.findOne({id: userId}, (error, user) => {
  //     if (error){
  //         res.json({error: 'Unable to find user'})
  //     }else {
  //         res.json({message: application})

  //         user.application.push(application)
  //         user.save()

  //     }
  // })
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      if (!error) {
        let newUser = models.User.build({
          username: username,
          password: hash,
          email: email,
        });
        newUser.save((error) => {
          if (error) {
            res.json({ error: "Unable to Register!" });
          } else {
            res.json({ success: true, message: "Saved new User" });
          }
        });
      } else {
        res.json({ success: false });
      }
    });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  models.User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          var token = jwt.sign({ username: username }, "KRABBYPATTYFORMULA");
          console.log(result);
          res.json({
            success: true,
            userId: user.id,
            token: token,
            username: username,
          });
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

app.post("/app", (req, res) => {
  let userid = req.body.userId;
  let company = req.body.company;
  let seeComp = req.body.seeComp;
  let jobTitle = req.body.title;
  let seeJob = req.body.seeJob;
  let date = Date.now();

  let newApp = models.Application.build({
    user_id: userid,
    company: company,
    title: jobTitle,
  });

  newApp.save().then((savedApp) => {
    res.json({
      success: true,
    });
  });
});

app.get("/emoji/:data", (req, res) => {
  //http://localhost:8080/emoji/1,2,80,heart 1 is sender, 2, is user, 80 is application, heart is emoji
  let data = req.params.data;
  let string = data.split(",");
  //This is the User ID for the sender of the emoji
  let sender = string[0];
  //This is the User ID of the recipient
  let user = string[1];
  let application = string[2];
  let emoji = string[3];

  console.log(data);

  //Updating the count in the Application Table
  models.Application.update(
    {
      [emoji]: sequelize.literal(`${emoji} + 1`),
    },
    {
      where: {
        id: application,
      },
    }
  );

  //update the count in the User Table
  models.User.update(
    {
      [emoji]: sequelize.literal(`${emoji} + 1`),
    },
    {
      where: {
        id: user,
      },
    }
  );
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

    //Update MongoDB database for user sending emoji
    let emojiChange = {
        application_id: application,
        [emoji]: true

    }

    User.findOneAndUpdate(
      { id: user, emojis: { $elemMatch: { application_id: application } } },
      { $set: { [`emojis.$.${emoji}`]: true } },
      { upsert: true, useFindAndModify: false },
      (error, result) => {
        if (!result) {
          User.findOne({ id: user }, (error, user) => {
            if (!user) {
              var newUser = new User({
                id: string[1],
              });

              newUser.emojis.push(emojiChange);
              newUser.save();
            } else {
              user.emojis.push(emojiChange);
              user.save((error) => {
                if (error) {
                  console.log({ error: "Unable to save emoji" });
                } else {
                  console.log({
                    success: true,
                    message: "Emoji has been saved!",
                  });
                }
              });
            }
          });
        } else {
          console.log(result);
        }
      }
    );

  //Still need MongoDB database for user sending emoji

//   let emojiChange = new EmojiItem({
//     application_id: application,
//     [emoji]: true,
//   });

  User.findOne(
    { id: user, emojis: { $elemMatch: { application_id: application } } },
    (error, user) => {
      if (error) {
        console.log(error);
      } else {
        console.log(user);

        user.emojis.push(emojiChange);
        user.save((error) => {
          if (error) {
            console.log({ error: "Unable to save user" });
          } else {
            console.log({ success: true, message: "User has been saved!" });
          }
        });
      }
    }
  );
})

  res.json({ life: "continues" });
});

// Grabbing all Users applications
app.get('/profile/:user', (req,res)=>{
    let user = req.params.user

    models.Application.findAll({
        where: {user_id: user},  order: [
            ['id', 'DESC']
        ],
    }).then(apps =>{
        res.json(apps)
    })
})

//Gets all user info
app.get('/user/:id', (req,res)=>{
    
    let user = req.params.id

    const headers = req.headers
    if(headers) {
      const authorization = headers['authorization']
      if(authorization) {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, 'KRABBYPATTYFORMULA')
        console.log(decoded)
        if(decoded) {
          const username = decoded.username
          console.log(user)
          models.User.findOne({
            where: {
              id: user,
              username: username
            }
          }).then((user) => {
              res.json(user)

            // if(user) {
            //   next()
    
            //   models.User.findOne({
            //       where: {id: user}
            //   }).then(user =>{
            //       res.json(user)
            //   })
            // }
          })
          // const authUser = users.find(user => user.username == username)
          // console.log(authUser)
          // if(authUser) {
          // }
        } else {
          res.json({error: 'Unable to authenticate'})
        }
      } else {
        res.json({error: 'Unable to authenticate'})
      }
    } else {
      res.json({error: 'error in headers'})
    }

})


//Feeding the Main Page Feed
app.get("/feed/:page", (req, res) => {
  let page = req.params.page;
  let offset = page * 10;

  models.Application.findAll({
    order: [["id", "DESC"]],
    offset: offset,
    limit: 10,
  }).then((apps) => {
    res.json(apps);
  });
});

//NEED TO ADD Authentication Check - Get user_id to input in request
app.get("/search/:term", (req, res) => {
  let term = req.params.term;
  let user_id = 2;

  models.Application.findAll({
    where: {
      user_id: user_id,
      [Op.or]: [
        {
          title: {
            [Op.regexp]: term,
          },
        },
        {
          company: {
            [Op.regexp]: term,
          },
        },
      ],
    },
  }).then((objects) => {
    res.json(objects);
  });
});

//Get's top 5 users with most applications submitted
app.get("/top", (req, res) => {
  models.User.findAll({
    //Only getting username and total_apps, we don't need password, email or other fields.
    attributes: ["username", "total_apps", "profileImage"],
    order: [["total_apps", "DESC"]],
    limit: 5,
  }).then((top) => {
    res.json(top);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

app.listen(8080, () => {
  console.log("Ready to be HAPPY about Sadness...");
});
