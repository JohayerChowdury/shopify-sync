# Shopify-ConnectorApp

An app developed by me (@JohayerChowdury) and Mathew Nacev during our time at ShyftLabs that allows a Shopify merchant to access their Shopify stores and view their products locally.

Server .env file holds following parameters:
- DB_URI

- JWT_SECRET

- EMAIL_WEB_URI

Front .env file holds following parameters:

- REACT_APP_API_URL

Steps to run the app:
<!--- 1. (optional) Run a redis server (run through these instructions: https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
2. (optional) Make sure that mongosh is installed. Run the following command: 

mongosh "mongodb+srv://cluster0.brkzpsl.mongodb.net/myFirstDatabase" --apiVersion 1 --username MathewShyftLabs

this will prompt you for a password which is stored here along with the .env variables https://docs.google.com/spreadsheets/d/1L63QarXTu79ijduFw75YobOXm4SpV8Su5fkRbioFs84/edit?usp=sharing -->

1. to run the backend, cd to the server folder, install packages and run `npm run devStart`
2. to run the frontend, cd to the frontend folder, install packages and run `npm start`
