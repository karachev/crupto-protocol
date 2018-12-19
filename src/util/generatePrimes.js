const fs = require('fs');
const path = require('path');
const getPrimes = require('get-primes');

const primeNumbers = getPrimes(10000000);

fs.writeFileSync(
	path.resolve(__dirname, 'primesNumbers.json'), 
	JSON.stringify(primeNumbers)
);

