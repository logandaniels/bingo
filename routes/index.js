var express = require('express');
var router = express.Router();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sms', function(req, res, next) {
	client.messages.create({ 
	    to: "+16517577529", 
	    from: process.env.TWILIO_NUMBER, 
	    body: "You got a BINGO!", 
	}, function(err, message) { 
	    console.log(message.sid); 
	});
});

module.exports = router;
