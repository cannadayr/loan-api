#!/usr/bin/env node
// import libs
const fetch = require('node-fetch');
const querystring = require('querystring');

// api specific vars
const base_url = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";

var params = {
    a: 1,
    b: 2,
    c: 3
};

let queryString = querystring.stringify(params);

console.log(queryString);
/*
fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => console.log(json));
*/

