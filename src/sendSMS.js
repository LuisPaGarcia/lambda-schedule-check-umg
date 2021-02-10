const process = require('../env').twilio;
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const from = process.env.PHONE_NUMBER_FROM;
const to = process.env.PHONE_NUMBER_TO;
const client = require('twilio')(accountSid, authToken);

/**
 * 
 * @param {string} message message to send via SMS
 */
async function sendSMS(message) {
	return client.messages.create({ body: message, from, to });
}

module.exports = sendSMS;
