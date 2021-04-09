
const express = require('express');

const router = express.Router();
const config = require('../config'); const mongoose = require("mongoose");


const client = require('twilio')(config.accountID, config.authToken);

const User = require('../models/user');


router.get('/login/:phonenumber/:channel', (req, res) => {
    //res.send("Welcome");
    let phonenumber = req.params.phonenumber;
    let channel = req.params.channel;
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: `+${phonenumber}`,
            channel: channel
        })
        .then((data) => {
            res.status(200).send(data);
        })

})

router.get('/verify/:phonenumber/:code', (req, res) => {
    let phonenumber = req.params.phonenumber;
    let code = req.params.code
    console.log(phonenumber);
    console.log(code);
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+${phonenumber}`,
            code: code

        })
        .then((data) => {
            res.status(200).send(data);
        })

})


router.post('/check', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "User created"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


})


router.post('/addPhone', (req, res) => {
    console.log("addphoned");

    /*  Otp.find({ phonenumber: req.body.phonenumber })
          .exec()
          .then(user => {
              if (user.length >= 1) {
                  return res.status(409).json({
                      message: "Mail exists"
                  });
              }*/


    const phno = new User({
        phonenumber: req.body.phonenumber,
    })

    phno.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User created"
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });







})

module.exports = router;