const process = require('../env').github;
const test = require('tape');
const CrudGist = require('../src/crudGist/index');

const crud = new CrudGist(process.env.GIST_DB_ID);
test('Testing Get from Gist', async function(t) {
	try {
		const response = await crud.get();
		const keys = Object.keys(response);
		t.equal(typeof response, 'object', 'El request es un objeto, OK');
		for (const guia of [ '1W211083535', '1W211084034' ]) {
			t.equal(keys.includes(guia), true, `El request incluye el tracking id correcto ${guia}, OK`);
			t.equal(typeof response[guia] === 'string', true, `Numero ${guia} es un string definido, OK`);
		}
	} catch (error) {
		t.notOk(true, error.message);
	}
});

test('Testing Patch to Gist', async function(t) {
	try {
		// TODO
		t.ok(true, 'ok');
	} catch (error) {}
});
