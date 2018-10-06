#!/usr/bin/env node

// import env
require('dotenv').config()

// import data
const data = require('./test_data/cust_data.json');
const quotes = require('./test_data/api_output.json');

// import lib
const lib = require('./src/lib.js');

// get length of cust data
var custDataLen = data.length;

var result = lib.handleReq(data,quotes);

console.log(result);

