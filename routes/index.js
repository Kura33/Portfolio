var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/realisations', function(req, res, next) {
  res.render('realisations')
})

router.post('/contact.html', function(req, res, next) {
  let name = req.body.contact_name;
  let email = req.body.contact_email;
  let message = req.body.contact_message;

  let info = sendMail(name, email, message).catch(console.error);
  console.log(info);
  res.render('index', info);
})

async function sendMail(name, email, message) {
  let transporter = nodemailer.createTransport({
    host: 'mail.gandi.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'contact@sebastien-xaviercarlos.com', // generated ethereal user
      pass: process.env.PASS // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '" ' + name + '" <' + email + '>', // sender address
    to: "sebastien.xaviercarlos@hotmail.com", // list of receivers
    subject: "Message de " + name + " envoyé via la portfolio", // Subject line
    text: message // plain text body
  });
  return info;
}

module.exports = router;
