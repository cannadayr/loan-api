#!/usr/bin/env node

// import env
require('dotenv').config()

// import data
const data = require('./test_data/cust_data.json');
const quotes = require('./test_data/api_output.json');

// import lib
const lib = require('./src/lib.js');

// set expected result
expectedRate = 4.125;

// get length of cust data
var custDataLen = data.length;

var result = lib.handleReq(data,quotes);

lowestRate = result.lowestQuote.interestRate;

if (lowestRate == expectedRate) {
    console.log('the test passed!');
}
else {
    console.log('the test failed, lowestRate != expectedRate');
}

