const axios = require('axios');
const getUrl = require('./getUrl');
const guidesObj = {
	ale: '1W211083535',
	mochy: '1W211084034'
};
async function verifyGuides() {
	try {
		for (const guide of Object.keys(guidesObj)) {
			const response = await axios.get(getUrl(guidesObj[guide]));
			const status = response.data.tracking.datosGuia.PODStatusDes;
			console.log(guide, guidesObj[guide], status);
		}
	} catch (error) {
		console.log(error);
	}
}
verifyGuides();

module.exports = verifyGuides;
