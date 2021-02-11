const verifyGuides = require('./src/verifyGuides');

module.exports.verifyUmgGuide = async (event, context) => {
	try {
		await verifyGuides();
	} catch (error) {
		console.log(error);
	}
};
