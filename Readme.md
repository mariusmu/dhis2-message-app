# DHIS2 Message app
This project is associated with the course INF5750 at the University of Oslo.

Note: This branch is responsible for the web app of the social sharing app.

Note:
If you are interested in the native modification of DHIS2 (another way of doing this project),
please refere to the following repository
https://github.com/AndreOphelie/dhis-web-dashboard-integration

This app is made for the DHIS2 platform, and will add extra functionality
with social medias.

# Main goal
Add support for sharing favorites data (maps, charts and pivot tables)
on social medias (Facebook, Twitter).

# Current status
Complete.

# Important note about sharing
- Twitter: works for everyone
- Facebook: actually only works for developers, because it needs administration validation
 by Facebook to be public.


# To run
#####################################
locally: localhost:3000
#####################################
## Technologies you will need
- NodeJS

## DHIS2
- a running DHIS live

## Steps
1. run  ``` npm install ```
2. run ```` npm run start ``
3. localhost:3000

# To build
```npm run build```

Notes: running it this way, you will only have tha data presentation working.
Without a server, the upload step of files fail because of security reason
(we can't fetch a file on file:// with the different browsers).

######################################
locally: webapp on dhis live: localhost:8082
######################################
## DHIS2
- a DHIS live instance

## modify
- go in index.tpl.html
- replace headers imports with those in comment
- uncomment the bundle import at the bottom

## Steps
1. copy the root folder in dhis live webapps/dhis/
2. run ``` npm install ``` inside the new folder
3. run ``` webpack ``` to generate the bundle
4. run DHIS2 live and go to http://localhost:8082/dhis2-message-app/app/index.tpl.html


#####################################
app on dhis test server
#####################################
- zip the content of social sharing folder
- upload it to dhis test server
- enjoy =)
