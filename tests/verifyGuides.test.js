const test = require('tape');
const verifyGuides = require('../src/verifyGuides');

test('Testing verify guides - Cargo Expresso API', async function(t) {
	try {
		const guides = await verifyGuides();
		// TODO
		console.log(guides);
	} catch (error) {
		t.notOk(true, error.message);
	}
});
