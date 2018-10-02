#!/bin/bash
. env.sh
BASE_URL="https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?"
CREDIT="&creditScore=700"
PROPERTY="&propertyType=SingleFamily"
OCCUPANCY="&occupancy=Primary"
LOAN="&loanSize=450000"
PARAMS="${CREDIT}${PROPERTY}${OCCUPANCY}${LOAN}"
URL="${BASE_URL}${PARAMS}"
#echo "url = '${URL}'"
curl --header "Authorization: RG-AUTH ${RG_AUTH}" ${URL}
echo

