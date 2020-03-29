const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const techCards = require('./routes/api/techCards.js');
const menus = require('./routes/api/menus.js');
var nodemailer = require('nodemailer');

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./configuration/config').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/techCards', techCards);
app.use('/api/menu', menus);
app.post('/api/sendEmail', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lorna.kshlerin@ethereal.email',
      pass: '76XxBP4say7xDMtyJk'
    }
  });

  var msg = `
    <p>Technologinė kortelė</p>
    <h3>${req.body.payload.nameOfCard}</h3>
    ${req.body.payload.data.map(row => (
    `<ul>
      <li>Nr: ${row.number}</li>
      <li>Pavadinimas: ${row.name}</li>
      <li>Bruto: ${row.bruto}</li>
      <li>Neto: ${row.neto}</li>
      <li>Baltymai, g: ${row.b}</li>
      <li>Riebalai, g: ${row.r}</li>
      <li>Angliavandeniai, g: ${row.a}</li>
      <li>Energinė vertė, kcal: ${row.kcal}</li>
    </ul>`
  ))}
      <h5>Aprašymas:</h5>
      <p>${req.body.payload.description}</p>
  `

  var mailOptions = {
    from: 'lorna.kshlerin@ethereal.email',
    to: 'lorna.kshlerin@ethereal.email',
    subject: 'Payload',
    html: msg
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

// process.env.PORT for heroku
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3001 : process.env.PORT;

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
    port,
    port,
  );
});

module.exports = app;
