## Description
a simple API fetch & parsing example

## How-to
How to add token:
* add a file named '.env' in root dir with your auth token (see .env-example for expected format)

How to run example:
```
./node_fetch.js
```

How to run tests:
```
./run_tests.sh
```

## Library Descriptions
* dotenv: used to hold auth tokens without checking into repo
* node-fetch: used to perform http requests
* querystring: used to build url from parameters

## files
* node_fetch.js : primary entrance
* run_tests.sh : run tests
* src/ : contains exported functions called in node_fetch.js
* test_data: contains data used for testing

## Requirements
* Some ecmascript functions might be used, currently tested on nodejs version 'v8.11.2'
* basic unix utils

