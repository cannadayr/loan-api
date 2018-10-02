#!/usr/bin/env bash
test "$(./js_test.js | xargs)" = "{ loanSize: 450000, creditScore: 700, propertyType: SingleFamily, occupancy: Primary, lowestQuote: { lenderName: Online National Financial Institution, loanType: 30YR Fixed, interestRate: 4.125, closingCosts: 11250, monthlyPayment: 2180.9237962410334, apr: 4.332233224568883 } }" \
&& echo "it passes!"


