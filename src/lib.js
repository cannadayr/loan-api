const fetch = require('node-fetch');
const querystring = require('querystring');

// global vars
const baseUrl = "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?";

exports.getCustData = function(thisCust) {
    // log cust data
    //console.log(data['customerData'][i]);

    // set data to local var
    //var thisCust = data['customerData'][i];
    //console.log(thisCust);
    //process.exit();

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
    }).then(res => res.json())
      .then(json => this.handleReq(thisCust, json));

}

exports.handleReq = function(thisCust,data) {

    // log input
    //console.log(data);
    //console.log(thisCust);

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
        //console.log(thisQuote);

        // disregard quotes that aren't 30 yr fixed
        if (thisQuote['loanType'] != '30YR Fixed') {
            continue;
        }
        else {

            // check if we've got the lowest interest rate
            var thisRate = thisQuote['interestRate'];

            // log the current quote
            //console.log(thisQuote);
            //console.log(thisRate);
            //console.log(currentLowestRate);

            if (
                currentLowestRate == undefined
                || thisRate < currentLowestRate
            ) {
                //console.log('setting lowest quote');

                // it has a lower interest rate, set it
                currentLowestRate = thisRate;
                currentLowestQuote = thisQuote;
            }

            // TODO push to an array if it has the same interest rate
        }
    }

    //console.log(currentLowestQuote);

    // assemble the rest of the output object
    thisResult['lowestQuote'] = currentLowestQuote;

    // #TODO, figure out how to organize code as-to be able to return the object
    // javascript promise chaining is #weird
    console.log(thisResult);
}

