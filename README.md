# STVgoDIGITAL Integration API

This API represents the integration between blockchain through Fablo API and off-chain Postgres database.

## Pre-requisites
To start the project the following steps are required:

1. Run in the console: npm install;
2. Create a .env file in the root of the project and add at least the following constants;
   1. SERVER_PORT -> Port of the server
   2. SESSION_SECRET -> Secret to sequelize sessions
   3. WEB_APP_URL -> URL of the web application
   4. DATABASE_NAME -> Name of the PostgreSQL database
   5. DATABASE_USER -> Username of the PostgreSQL database
   6. DATABASE_PASSWORD -> Password of the PostgreSQL database
   7. DATABASE_HOST -> Host of the PostgreSQL database
   8. NODE_ENV -> Environment of the Server
3. Run in the console npm start or npm run dev (for development);

## Development - Unit tests

All tests are located in the project folder **/src/__tests__** divided by files for each table.
Eg. Table User -> user.test.js

To run the unit tests you must run the following command: npm test


## Endpoints

There are a number of endpoints divided by off-chain and on-chain requests.

### On-chain requests

All endpoints in this category start with /onchain.

1. User **/user**
   1. Enroll **/enroll** ✔️ 
        ```json
        {
        "id": "exampleId",
        "secret": "exampleSecret"
        }
    
    2. Register **/register** ✔️
        ```json
        {
        "id": "exampleId",
        "secret": "exampleSecret"
        }
   
2. Channel Batch **/channel/batch**
   1. Get All Batches **/** ✔️
   2. Get Batch by id **/getBatchById/:id** ✔️
   3. Get Batch by internal id **/getBatchByInternalId/:id** ✔️
   4. Get Batches Graph Mode **/graphMapMode** ✔️
   5. Get Batches Graph Mode By ID **/graphMapModeID/:ID** ✔️

3. Channel Activities Production **/channel/activities/production**
      1. Get All Productions **/** ✔️
      2. Get Production by id **/getById/:id** ✔️
      3. Insert Production **/insert** ✔️
          ```json
            {
            "productionID": "p-xxxxxxxx",
            "productionUnitInternalID": "PU1",
            "productionType": "SPINNING",
            "activityStartDate": "2022-09-12T11:45:26.371Z",
            "batchID": "b-xxxxxxxx",
            "batchType": "YARN",
            "batchInternalID": "b-xxxxxxxx-iid",
            "supplierID": "suppl-001",
            "inputBatches": {
               "b-xxxxxxxx": 100,
               "b-yyyyyyyy": 100
            },
            "batchComposition": {
               "organic_cotton": 50,
               "polyamide6": 50
            },
            "quantity": "200",
            "finalScore": "-3",
            "productionScore": "-1",
            "ses": "-9"
            }

4. Channel Activities Logistical Reception **/channel/activities/logistical/reception**
      1. Get All Receptions **/** ✔️
      2. Get Reception by id **/getById/:id** ✔️
      3. Insert Registration **/insert** ✔️
          ```json
            {
               "receptionID": "rc-xxxxxxxx",
               "productionUnitInternalID": "P-01",
               "activityDate": "2023-05-03T00:00:00Z",
               "receivedBatchID": "b-xxxxxxxx",
               "newBatchID": "b-xxxxxxxx",
               "newBatchInternalID": "b-xxxxxxxx-iid",
               "isAccepted": true,
               "distance": 100
            }

5. Channel Activities Logistical Registration **/channel/activities/logistical/registration**
      1. Get All Registrations **/** ✔️
      2. Get Registration by id **/getById/:id** ✔️
      3. Insert Registration **/insert** ✔️
          ```json
            {
               "registrationID": "rg-xxxxxxxx",
               "ProductionUnitID": "P-01",
               "batchID": "b-xxxxxxxx",
               "batchType": "EXAMPLE_TYPE",
               "batchInternalID": "b-xxxxxxxx-iid",
               "supplierID": "Suppl-xxxxxxxx",
               "quantity": "100",
               "batchComposition": {
                  "organic_cotton": 100
               }
            }

6. Channel Activities Logistical Transportation **/channel/activities/logistical/transportation**
      1. Get All Transportations **/** ✔️
      2. Get Transportation by id **/getById/:id** ✔️
      3. Insert Transportation **/insert** ✔️
          ```json
            {
               "transportID": "t-xxxxxxxx",
               "originProductionUnitInternalID": "p-xxxxxxxx",
               "destinationProductionUnitID": "p-xxxxxxxx",
               "transportType": "EXAMPLE_TYPE",
               "activityDate": "2023-05-03T00:00:00Z",
               "inputBatches": {
                  "b-xxxxxxxx": 100
               },
               "isReturn": false,
            }


### Off-chain requests
✔️ ⚠️ ❌
All endpoints in this category start in the root path and have the table name specified after it.

⚠️ Only the endpoints described in this category are currently in use.

1. User **/users**
   1. Get all users **/** ✔️
   2. Insert a new user **/insert** ✔️
      ```json
            {
               "email": "stvemail@example.com",
               "password": "***********",
               "name": "user"
            }
   3. Update an user **/update** ✔️
      ```json
            {
               "email": "stvemail@example.com",
               "password": "***********",
               "name": "user",
               "permission":"ADMIN"
            }
   4. Delete user **/delete** ✔️
      ```json
            {
               "email": "stvemail@example.com",
               "password": "***********"
            }
   5. Login **/login** ✔️
      ```json
            {
               "email": "stvemail@example.com",
               "password": "***********"
            }
   6. Logout **/logout** ✔️

1. Company **/companies**
   1. Get all companies **/** ✔️
   2. Get company by id **/byId/:id** ✔️
   3. Insert a new company **/insert** ✔️
      ```json
            {
               "legalName": "legalCompanyName",
               "shortName": "shortCompanyName",
               "fiscalNumber": "123456789",
               "caeType": "TYPE_CAE"
            }
   4. Update company **/update** ✔️
      ```json
            {
               "id": "3fc5b3e8-801d-4cec-b445-839068f99ea2",
               "legalName": "legalCompanyName",
               "shortName": "shortCompanyName",
               "fiscalNumber": "123456789",
               "caeType": "TYPE_CAE"
            }
   5. Delete companies **/delete** ✔️
      ```json
            {
               "id": "3fc5b3e8-801d-4cec-b445-839068f99ea2"
            }

1. Activity Type Data **/activityTypeData**
   1. Get all **/** ✔️
   2. Get by id **/byId/:id** ✔️
   3. Insert  **/insert** ✔️
      ```json
            {
               "ActivityTypeId": "SPINNING",
               "DataId": "3fc5b3e8-801d-4cec-b445-839068f99ea2",
               "mandatory": false,
            }
   4. Update **/update** ✔️
      ```json
            {
               "id": "3fc5b3e8-801d-4cec-b445-839068f99ea2",
               "ActivityTypeId": "SPINNING",
               "DataId": "3fc5b3e8-801d-4cec-b445-839068f99ea2",
               "mandatory": true,
            }
   5. Delete **/delete** ✔️
      ```json
            {
               "id": "3fc5b3e8-801d-4cec-b445-839068f99ea2"
            }
