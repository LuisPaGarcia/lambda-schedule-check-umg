const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const from = process.env.PHONE_NUMBER_FROM;
const to = process.env.PHONE_NUMBER_TO;
const client = require("twilio")(accountSid, authToken);

module.exports = async function sendSMS(body) {
  return client.messages.create({ body, from, to });
};
