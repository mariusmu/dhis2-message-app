# DHIS2 Message app
This project is associated with the course INF5057 at the University of Oslo.

Note: This branch only contains the message app. The social sharing app is in its own branch

Note: To make the app work, you also need to install [https://github.com/mariusmu/dhis2-jmo-fileserver]

This app is made for the DHIS2 platform, and will add extra functionality
to the message feature.

# Main goal
Add support for embedding images and files onto messages sent by users.

# Current status
- Implementation complete

# To run

## Technologies you will need
- NodeJS

## Steps
0. Generate an access token and add it to app/Actions/message.action and user.action
1. First rename app/Constants/SecretConstants_base.js to SecretConstants.js
2. Add the neccessary values to the SecretConstant.js file
3. run  ``` npm install ```
4. run ``` npm run start ```

## Urls
Read message: http://localhost:3000/?/readMessage.action?id=K1jUMuUrQAq
Write message:  http://localhost:3000/?/showSendMessage.action

Please note that the Write message functionality only works 
within the DHIS2 dashboard with the modified vm files (found in DHIS2-dashboard-changes)

# To build
1. ```npm run build```
2. Replace DHIS2 dashboard files with the files in DHIS2-dashboard-changes
3. Add /dist/assets/bundle.js to DHIS2 (C:\Users\marius\Downloads\dhis2-live (1)\dhis-live\webapps\dhis\dhis-web-dashboard-integration) 
4. Open DHIS2 dashboard

## Important!
If you were to add this to the dhis2 dashboard, then you will need to change some .vm files
on DHIS2. Please replace the files dhis-live\webapps\dhis\dhis-web-dashboard-integration\ with
the vm files in the folder "DHIS2-dashboard-changes". Also copy the stylesheet

# Tests
We have only tested the reducers, ApiService and Action creators
To run the test run ```npm run test```