#!/usr/bin/env node

// import env
require('dotenv').config()

// import data
const data = require('./code-challenge.json');

// import lib
const lib = require('./src/lib.js');

// get length of cust data
var custDataLen = data['customerData'].length;

// iterate thru data and call library function
for (var i = 0; i < custDataLen; i++) {

    lib.getCustData(data['customerData'][i]);

}

