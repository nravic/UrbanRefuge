/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app/app.json';

AppRegistry.registerComponent(appName, () => App);


class UrbanRefuge extends React.Component {
    render() {
        return(
              <App />
        );
 }
}

export default UrbanRefuge;
