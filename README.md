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

## Endpoints

There are a number of endpoints divided by off-chain and on-chain requests.

### On-chain requests
✔️ ⚠️ ❌
All endpoints in this category start with /onchain

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
    
    3. Get Entities / ⚠️
   
2. Channel Batch **/channel/batch**
   1. Get All Batches **/** ✔️
   2. Get Batch by id **/getBatchById/:id**
   3. Get Batch by internal id **/getBatchByInternalId/:id**
   4. Delete All Batches **/deleteAllBatches**


3. Channel Activities Production /channel/activities/production
4. Channel Activities Logistical Reception /channel/activities/logistical/reception
5. Channel Activities Logistical Registration /channel/activities/logistical/registration
6. Channel Activities Logistical Transportation /channel/activities/logistical/transportation