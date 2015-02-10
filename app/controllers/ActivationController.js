'use strict';

var util = require('util');

var User = require('./../model/User');
var Activator = require('./../services/Activator');
var Mailer = require('./../services/Mailer');

var secret = require('./../../config/secret');
var mailConfig = require('./../../config/mail');

/*
 * Task: Resend activation email
 */
module.exports.resendEmail = function(req, res) {
	// input validation
	req.checkBody('email', 'invalid email').notEmpty().isEmail();

	// input error handling
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: 'There have been validation errors', errors:errors});
	}

	var email = req.body.email;

	// check if user already exists
	var query = {email: email.toLowerCase()};
	User.findOne(query, function(err, user) {
		if (err) return res.status(500).json({ message: 'internal db error (0)'});
		if (!user) return res.status(400).json({ message: 'invalid email (1)'});
		if (user.activated) return res.status(400).json({ message: 'user already activated'});

		// generate activation token
		var token = Activator.generateToken(user, secret.activationKey);

		// prepare email
		var email = {
			from: 'skeleton <notifications@desaroxx.com>', // sender address
		    to: user.email, // list of receivers
		    subject: 'Account activation: resend', // Subject line
		    text: token, // plaintext body
		    html: token // html body
		}

		// send email
		Mailer.sendMail(email, mailConfig.smtpSettings);
		var message = 'activation resent to: ' + user.email;
		return res.json({ message: message});
	});
};

/*
 * Task: Activate user
 */
module.exports.activate = function(req, res) {
	// input validation
	req.checkBody('token', 'invalid token').notEmpty();

	// input error handling
	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ message: 'There have been validation errors', errors:errors});
	}

	// get user from token
	var user = Activator.verfiyAndGetUser(req.body.token, secret.activationKey);
	if (!user) {
		return res.status(400).json({ message: 'invalid activation token'});
	}

	// activate user in db
	var query = {email: user.email.toLowerCase()};
	var update = {activated: true};
	var options = {};
	User.findOneAndUpdate(query, update, options, function(err, updatedUser) {
		if (err) {
			return res.status(500).json({ message: 'internal db error (2)'});
		}
		if (!updatedUser) return res.status(400).json({ message: 'valid token, but user does not exist'});
		var message = 'activated: ' + updatedUser.email;
		return res.json({ message: message});
	});
};