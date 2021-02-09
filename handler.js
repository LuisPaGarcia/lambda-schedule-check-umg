const verifyGuides = require('./src/verifyGuides');

module.exports.verifyUmgGuide = async (event, context) => {
	try {
		verifyGuides();
	} catch (error) {
		console.log(error);
	}
};
