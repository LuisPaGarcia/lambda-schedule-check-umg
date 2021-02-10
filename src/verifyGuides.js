const axios = require('axios');
const getUrl = require('./getUrl');
const sendSMS = require('./sendSMS');
const CrudGist = require('./crudGist/index');
const guidesObj = {
	ale: '1W211083535',
	mochy: '1W211084034'
};

/**
 * Function to make a request to get the package status
 */
async function verifyGuides() {
	try {
		const db = new CrudGist(process.env.GIST_DB_ID);
		const promises = Object.keys(guidesObj).map(guide => axios.get(getUrl(guidesObj[guide])));
		promises.push(db.get());
		const [ guide1, guide2, gistcontent ] = await Promise.all(promises);

		const {
			PODStatusDes: status1,
			DestinatarioNombre: nombre1,
			NumeroGuia: numeroGuia1
		} = guide1.data.tracking.datosGuia;

		const {
			PODStatusDes: status2,
			DestinatarioNombre: nombre2,
			NumeroGuia: numeroGuia2
		} = guide2.data.tracking.datosGuia;

		// Flag to know if a gist needs to be updated
		let gistNeedsUpdate = false;

		// If status 1 has changed
		if (gistcontent[numeroGuia1] === status1) {
			console.log('guia 1 sigue en el mismo status');
		} else {
			console.log('guia 1 ha cambiado status a: ', gistcontent[numeroGuia1]);
			gistcontent[numeroGuia1] = status1;
			gistNeedsUpdate = true;
		}

		// If status 2 has changed
		if (gistcontent[numeroGuia2] === status2) {
			console.log('guia 2 sigue en el mismo status');
		} else {
			console.log('guia 2 ha cambiado status a: ', gistcontent[numeroGuia2]);
			gistcontent[numeroGuia2] = status2;
			gistNeedsUpdate = true;
		}

		// if gist needs update
		if (gistNeedsUpdate) {
			sendSMS(`Ale: ${status1} Mochy: ${status2}`);
			await db.patch(gistcontent);
			console.log('gist needs update');
		} else {
			console.log('gist needs no update');
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = verifyGuides;
