const sendMail = estado => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.em,
			pass: process.env.ps
		}
	});

	const mailOptions = {
		from: process.env.em,
		to: process.env.emails,
		subject: 'subject',
		html: `message`
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
};
