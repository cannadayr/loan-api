const fetch = require('node-fetch');
const querystring = require('querystring');

// global vars
const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";
const verbose = true;
//const verbose = false;

// internal debug function to switch on/off
exports.debug = function(name,variable) {
    if (verbose) {
        if (variable != undefined) {
            console.log(name,' = ',variable);
        }
        else {
            console.log(name);
        }
    }
    else {
        // noop
    }
}
exports.getCustData = function(thisCust) {

    // log cust data
    //this.debug('thisCust',thisCust);

    // set url params
    var urlParams = {
        loanSize: thisCust['loanSize'],
        creditScore: thisCust['creditScore'],
        propertyType: thisCust['propertyType'],
        occupancy: thisCust['occupancy']
    };

    // log urlParams
    //this.debug('urlParams',urlParams);

    // encode params
    let queryString = querystring.stringify(urlParams);

    // log query str
    //this.debug('queryString',queryString);

    // set headers, append query str, & fetch the url
    // return the promise object
    return fetch(baseUrl + queryString,{
            headers: { 'Authorization': 'RG-AUTH ' + process.env.RG_AUTH }
    }).then(res => res.json())
      .then(json => this.handleReq(thisCust, json));

}

exports.reducer = function(currentLowestQuote, thisQuote) {
    this.debug('#############################################');

    this.debug('currentLowestQuote',currentLowestQuote);
    this.debug('thisQuote',thisQuote);

    if (
        Object.keys(currentLowestQuote).length != 0
        && currentLowestQuote['loanType'] != '30YR Fixed'
    ) {
        // we haven't gotten a valid quote yet
        // return an empty object as the accumulator
        return {};
    }
    else {

        // get the current lowest rate for the current lowest quote
        var currentLowestRate = currentLowestQuote['interestRate'];
        this.debug('currentLowestRate',currentLowestRate);

        if (thisQuote['loanType'] != '30YR Fixed') {
            this.debug('its not 30yr fixed! returning previous lowest quote');
            return currentLowestQuote;
        }
        else {
            // check if we've got the lowest interest rate
            var thisRate = thisQuote['interestRate'];

            // log details
            this.debug('thisRate',thisRate);

            // if the lowestRate is undefined (first iteration)
            // or the current rate is less than it
            // set it as the new lowest rate
            if (
                thisRate < currentLowestRate
                || currentLowestRate == undefined
            ) {
                this.debug('setting lowest quote');
                return thisQuote;
            }
            else {
                return currentLowestQuote;
            }

            // TODO push to an array if it has the same interest rate

        }
    }
}

exports.handleReq = function(thisCust,data) {

    // log input
    this.debug('data',data);
    this.debug('thisCust',thisCust);

    // set the result to the customer data
    var thisResult = thisCust;

    // reduce quotes to lowest rate &
    // assemble the rest of the output object
    thisResult['lowestQuote'] = data['rateQuotes'].reduce(this.reducer.bind(this));

    // log and return result
    this.debug('thisResult',thisResult);
    return thisResult;
}

