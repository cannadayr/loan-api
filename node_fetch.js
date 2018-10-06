#!/usr/bin/env node

// import env
require('dotenv').config()

// import data
const data = require('./code-challenge.json');

// import libs
const lib = require('./src/lib.js');
const fs = require('fs');

// test for api token
if (fs.existsSync('.env')) {
    console.log('no environmental token! see .env-example & README');
    process.exit(1);
}

// get length of cust data
var custDataLen = data['customerData'].length;

// iterate thru data and call library function
results = [];
for (var i = 0; i < custDataLen; i++) {

    results.push(lib.getCustData(data['customerData'][i]));
}

lib.debug('results',results);
var promises = Promise.all(results).then(values => {
    console.log(values);
});

