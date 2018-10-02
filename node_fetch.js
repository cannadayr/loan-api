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

    // log params
    //console.log(params);

    // encode params
    let queryString = querystring.stringify(params);

    // log query str
    //console.log(queryString);

    // set headers, append query str, & fetch the url
    fetch(baseUrl + queryString,{
            headers: { 'Authorization': 'RG-AUTH ' + process.env.RG_AUTH }
        })
        .then(res => res.json())
        .then(json => handleReq(json));

}

function handleReq(data) {
    // log json input
    //console.log(data);

    // set empty output var
    var currentLowest = [];

    // get num of quotes
    var numQuotes = data['rateQuotes'].length;

    // loop thru quotes
    for (var i = 0; i < numQuotes; i++){
        var thisQuote = data['rateQuotes'][i];

        // log
        //console.log(thisQuote);

        // disregard quotes that aren't 30 yr fixed
        if (thisQuote['loanType'] != '30YR Fixed') {
            continue;
        }
        else {
            console.log(thisQuote);
            // check if we've got the lowest interest rate
            var thisRate = thisQuote['interestRate'];
            console.log(thisRate);
        }
    }

    // get only 30yr fixed loan types
    process.exit();
}
