#!/usr/bin/env node

// import env
require('dotenv').config()

// import data
const data = require('./code-challenge.json');

// import libs
const lib = require('./src/lib.js');
const fs = require('fs');

// test for api token
if (!fs.existsSync('.env')) {
    console.log('no environmental token! see .env-example & README');
    process.exit(1);
}

// get length of cust data
var custDataLen = data['customerData'].length;

// iterate thru data and call library function
//results = [];
var mapResult = data['customerData'].map(function(val){
    var custData = lib.getCustData(val);
    return custData;
});

lib.debug('mapResult',mapResult);

Promise.all(mapResult).then(values => {
    lib.debug('finalResults', values);
});

