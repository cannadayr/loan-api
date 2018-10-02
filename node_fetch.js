#!/usr/bin/env node
// import libs
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config()
const data = require('./code-challenge.json');

// api specific vars
const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";
const cooldown = 3;

// get length of cust data
var custDataLen = data['customerData'].length;
for (var i = 0; i < custDataLen; i++) {

    // log cust data
    //console.log(data['customerData'][i]);

    // set data to local var
    var thisCust = data['customerData'][i];

    // set url params
    var params = {
        loanSize: thisCust['loanSize'],
        creditScore: thisCust['creditScore'],
        propertyType: thisCust['propertyType'],
        occupancy: thisCust['occupancy']
    };
    console.log(params);
    process.exit();

    let queryString = querystring.stringify(params);

    console.log(queryString);

    fetch(baseUrl + queryString,{
            headers: { 'Authorization': 'RG-AUTH ' + process.env.RG_AUTH }
        })
        .then(res => res.json())
        .then(json => console.log(json));
}

