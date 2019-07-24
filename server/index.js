const express = require("express");
require("dotenv").config();

const session = require("express-session");
const mc = require('./messagesCtrl')

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
  })
);
app.use((req, res, next) => {
  let badwords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message){
    for (let i = 0; i < badwords.length; i++) {
      let regex = new RegExp(badwords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
});

app.get('/api/messages', mc.getAllMessages)
app.get('/api/messages/history', mc.history)
app.post('/api/message', mc.createMessage)


app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on ${process.env.SERVER_PORT}!`);
})
