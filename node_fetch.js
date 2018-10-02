#!/usr/bin/env node
// import libs
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config()

// api specific vars
const base_url = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";

var params = {
    creditScore: 700,
    propertyType: "SingleFamily",
    occupancy: "Primary",
    loanSize: 450000
};

let query_string = querystring.stringify(params);

console.log(query_string);

fetch(base_url + query_string,{
        headers: { 'Authorization': 'RG-AUTH ' + process.env.RG_AUTH }
    })
    .then(res => res.json())
    .then(json => console.log(json));

