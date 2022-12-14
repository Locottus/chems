//https://www.npmjs.com/package/crypto-js
var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('password', '7ffcfa45-2edf-4786-b8bc-3eeca032cb0a').toString();
console.log(ciphertext)
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, '7ffcfa45-2edf-4786-b8bc-3eeca032cb0a');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'

ciphertext = CryptoJS.AES.encrypt('password', '7ffcfa45-2edf-4786-b8bc-3eeca032cb0a').toString();
console.log(ciphertext)