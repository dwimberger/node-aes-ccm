var assert = require('assert');
var ccm = require('../build/Release/node_aes_ccm');

var TEST_CASES = [
  {
  	key: "eda32f751456e33195f1f499cf2dc7c97ea127b6d488f211ccc5126fbb24afa6",
  	iv: "a544218dadd3c1",
  	plain:"",
  	aad: "",
  	ct: "",
  	tag:"469c90bb",
  	tampered: false
  },
  {
  	key: "eda32f751456e33195f1f499cf2dc7c97ea127b6d488f211ccc5126fbb24afa6",
  	iv: "dbb3923156cfd6",
  	plain:"",
  	aad: "",
  	ct: "",
  	tag:"1302d515",
  	tampered: false
  },
    {
  	key: "eda32f751456e33195f1f499cf2dc7c97ea127b6d488f211ccc5126fbb24afa6",
  	iv: "a259c114eaac89",
  	plain:"",
  	aad: "",
  	ct: "",
  	tag:"4fe06e92",
  	tampered: false
  },
    {
  	key: "eda32f751456e33195f1f499cf2dc7c97ea127b6d488f211ccc5126fbb24afa6",
  	iv: "e1be89af98ffd7",
  	plain:"",
  	aad: "",
  	ct: "",
  	tag:"e5417f6b",
  	tampered: false
  },
    {
  	key: "eda32f751456e33195f1f499cf2dc7c97ea127b6d488f211ccc5126fbb24afa6",
  	iv: "1aa758eb2f9a28",
  	plain:"",
  	aad: "",
  	ct: "",
  	tag:"f8fa8e71",
  	tampered: false
  }
];

for (var i in TEST_CASES) {
  var test = TEST_CASES[i];
  //console.log(test);
  var res = ccm.encrypt(
		new Buffer(test.key, 'hex'),
		new Buffer(test.iv, 'hex'),
		new Buffer(test.plain, 'hex'),
		new Buffer(test.aad, 'hex'), test.tag.length / 2
  );
  //console.log(res);

	if (!test.tampered) {
		assert.equal(res.cipherText.toString('hex').toUpperCase(), test.ct.toUpperCase());
		assert.equal(res.authTag.toString('hex').toUpperCase(), test.tag.toUpperCase());
	}

	var dres = ccm.decrypt(
		new Buffer(test.key, 'hex'),
		new Buffer(test.iv, 'hex'),
		new Buffer(test.ct, 'hex'),
		new Buffer(test.aad, 'hex'),
		new Buffer(test.tag, 'hex')
	);
	//console.log(dres);

	if (!test.tampered) {
		assert.ok(dres.authOk);
		assert.equal(dres.plainText.toString('hex').toUpperCase(), test.plain.toUpperCase());
	} else {
		assert.equal(dres.authOk, false);
	}
}
