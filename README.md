# Urban Refuge 
Urban Refuge is built with React Native, and uses Google Firestore as the
backend for aid data retreival.

## Installation 
Pull the repository, and follow the instructions to create a Google Cloud
developer account and add the requisite information to your $PATH. 

`server/` contains python scripts under `helpers` to upload csv formatted
data to your firestore database. Once up, unless performing routine maintenance
on the database, `server` isn't used. 

To build the app for android or ios, run `react-native run-android` or
`react-native run-ios`. For android development, you'll need to have
AndroidStudio installed and on your $PATH, along with the Java SDK. 

## How to Contribute
Run the app, and if you see any glaring issues let me know or make a pull
request! I'm not perfect, and my code certainly isn't. 

## License
Urban Refuge is MIT Licensed. 
