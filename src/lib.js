const fetch = require('node-fetch');
const querystring = require('querystring');

// global vars
const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";
const verbose = true;
//const verbose = false;

// internal debug function to switch on/off
exports.debug = function(name,variable) {
    if (verbose) {
        console.log(name,' = ',variable);
    }
    else {
        // noop
    }
}
exports.getCustData = function(thisCust) {

    // log cust data
    this.debug('thisCust',thisCust);

    // set url params
    var urlParams = {
        loanSize: thisCust['loanSize'],
        creditScore: thisCust['creditScore'],
        propertyType: thisCust['propertyType'],
        occupancy: thisCust['occupancy']
    };

    // log urlParams
    this.debug('urlParams',urlParams);

    // encode params
    let queryString = querystring.stringify(urlParams);

    // log query str
    this.debug('queryString',queryString);

    // set headers, append query str, & fetch the url
    // return the promise object
    return fetch(baseUrl + queryString,{
            headers: { 'Authorization': 'RG-AUTH ' + process.env.RG_AUTH }
    }).then(res => res.json())
      .then(json => this.handleReq(thisCust, json));

}

exports.handleReq = function(thisCust,data) {

    // log input
    this.debug('data',data);
    this.debug('thisCust',thisCust);

    // set the result to the customer data
    var thisResult = thisCust;

    // set empty output var
    var currentLowestRate;
    var currentLowestQuote;

    // get num of quotes
    var numQuotes = data['rateQuotes'].length;

    // loop thru quotes
    for (var i = 0; i < numQuotes; i++){
        var thisQuote = data['rateQuotes'][i];

        // log
        this.debug('thisQuote',thisQuote);

        // disregard quotes that aren't 30 yr fixed
        if (thisQuote['loanType'] != '30YR Fixed') {
            continue;
        }
        else {

            // check if we've got the lowest interest rate
            var thisRate = thisQuote['interestRate'];

            // log details
            this.debug('thisQuote',thisQuote);
            this.debug('thisRate',thisRate);
            this.debug('currentLowestRate',currentLowestRate);

            // if the lowestRate is undefined (first iteration)
            // or the current rate is less than it
            // set it as the new lowest rate
            if (
                currentLowestRate == undefined
                || thisRate < currentLowestRate
            ) {
                this.debug('setting lowest quote');

                // it has a lower interest rate, set it
                currentLowestRate = thisRate;
                currentLowestQuote = thisQuote;
            }

            // TODO push to an array if it has the same interest rate
        }
    }

    this.debug('currentLowestQuote',currentLowestQuote);

    // assemble the rest of the output object
    thisResult['lowestQuote'] = currentLowestQuote;

    this.debug('thisResult',thisResult);
    return thisResult;
}

