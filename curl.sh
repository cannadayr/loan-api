#!/bin/bash
. env.sh
BASE_URL="https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes?"
CREDIT="&creditScore=300"
PROPERTY="&propertyType=SingleFamily"
OCCUPANCY="&occupancy=Primary"
PARAMS="${CREDIT}${PROPERTY}${OCCUPANCY}"
URL="${BASE_URL}${PARAMS}"
echo "url = '${URL}'"
curl --header "Authorization: RG-AUTH ${RG_AUTH}" ${URL}

