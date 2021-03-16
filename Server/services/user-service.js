'use strict';
const mongoose = require('mongoose'),
User = mongoose.model('user');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
var nodemailer = require('nodemailer');

// function ot send a email notification when a user registers
var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'houseshusky@gmail.com',
pass: 'Webdesign@2020'
}
});
// email strcuture
var mailOptions = {
from: 'houseshusky@gmail.com',
to: '',
subject: '',
text: ``
};

// email with details that would be sent out
function sendEmailViaNodeMailer(email)  {
mailOptions.to = email;
mailOptions.subject = 'Welcome to Husky House!';
mailOptions.text = 'Hi! You have Sucessfully been registered.';
console.log("EMAIL NODE MAILER PAYLOAD: ", JSON.stringify(mailOptions));
transporter.sendMail(mailOptions, function (error, info) {
if (error) {
    console.log("Email error: ", error);
} else {
    console.log('Email success: ' + info.response);
}
});

}


/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
const promise = User.find(params).exec();
return promise;
};

/**
 * Saves the new user object.
 *
 * @param user
*/
exports.save = (user) => {
const newuser = new User(user);
sendEmailViaNodeMailer(user.userEmailID);
return newuser.save();
};

/**
 * Returns the user object by id.
 *
 * @param userId
*/
exports.get = (userId) => {
const userPromise = User.findById(userId).exec();
return userPromise;
};

/**
 * Updates an existing user.
 *
 * @param updateduser
*/
exports.update = (updateduser) => {

const promise = User.findByIdAndUpdate(updateduser.id, updateduser).exec();
return promise;
};

/**
 * Deletes an existing user item.
 *
 * @param UserId
*/
exports.delete = (UserId) => {
const promise = User.findByIdAndRemove(UserId).exec();
return promise;
};



//login API
exports.login = (req, res) => {
console.log(req);
var request = {
userEmailID: req.query.userEmailID
    }
User.findOne(request, (err, response) => {

if (err) {
    res.status(500).send({
    status: 500,
    message: err.message || "Some error occurred while creating the Note."
});
} else if (response) {  
// check if the passowrds match
comparePassword(req.query.password, response.password).then((isMatch) => {
    if (isMatch) {
        res.status(200).send({
            status: 200,
            data: response
        });
    } else {
        // if passwords do not match
        res.status(200).send({
            status: 500,
            message: "Password doesn't match"
        });
    }
})
} else {
    // if the user does not exist in the db
    res.status(200).send({
    status: 500,
    message: "User not found"
});
}
})
}

// checks if the password matches with the passowrd in the database
function comparePassword(password, hash) {
console.log(password);
console.log(hash);
return bcrypt.compare(password, hash);
};

exports.registered = (req, response) => {


}
