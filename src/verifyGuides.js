const axios = require('axios');
const getUrl = require('./getUrl');
const sendSMS = require('./sendSMS');
const guidesObj = {
	ale: '1W211083535',
	mochy: '1W211084034'
};

/**
 * Function to make a request to get the package status
 */
async function verifyGuides() {
	try {
		const responses = await Promise.all(Object.keys(guidesObj).map(guide => axios.get(getUrl(guidesObj[guide]))));
		return responses.map(response => {
			const {
				PODStatusDes: status,
				DestinatarioNombre: nombre,
				NumeroGuia: numeroGuia
			} = response.data.tracking.datosGuia;
			// sendSMS(`${nombre} - ${numeroGuia} - ${status}`);
			return {
				nombre,
				numeroGuia,
				status
			};
		});
	} catch (error) {
		console.log(error);
	}
}
verifyGuides();

module.exports = verifyGuides;
