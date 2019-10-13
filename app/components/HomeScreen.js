import React from 'react';
import Map from './Map';
import MarkerDetails from './MarkerDetails';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Hyperlink from 'react-native-hyperlink';
import { createStackNavigator } from 'react-navigation-stack';
import i18n from '../utils/language/i18n';

import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');
const frameWidth = width;
const columnWidth = frameWidth / 3;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstLaunch: null, locale: i18n.locale, condUpdate: null };
  }

  componentDidMount() {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        this.setState({ firstLaunch: true });
      } else {
        this.setState({ firstLaunch: false });
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.firstLaunch == null) {
      return null;
    } else if (this.state.firstLaunch == true) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          <Text
            style={{ fontWeight: 'bold', fontFamily: 'roboto', fontSize: 20 }}>
            {' '}
            Welcome to Urban Refuge!{' '}
          </Text>
          <View stlye={{ marginTop: 15 }}>
            <Hyperlink linkStyle={{ color: '#2980b9' }} linkDefault={true}>
              <Text styles={styles.firstLaunchText}>
                We want to help you find the services you need from health and
                education to jobs and legal services. {'\n'} {'\n'}
                Want to learn more about us? See urbanrefuge.org.
                {'\n'} {'\n'}
                Here are some things you should know first: {'\n'} {'\n'}- We do
                not collect or store any data {'\n'}- We will never track or
                store your location {'\n'}- All of the content on this app is
                compiled by our nonprofit partners and project managers based on
                publicly available information. {'\n'}- While we do our best to
                ensure that everything is accurate and up-to-date, we do not
                claim responsibility for any variations from the service
                descriptions that are provided. {'\n'} {'\n'}
                We also currently only have data for the city of San Jose, CA;
                and are in the process of adding further datasets from cities
                around the world. {'\n'}
                {'\n'}{' '}
              </Text>
            </Hyperlink>
            <Hyperlink
              linkStyle={{ color: '#2980b9' }}
              linkText={url =>
                url === 'https://github.com/nravic/UrbanRefuge'
                  ? 'Terms and Conditions'
                  : url
              }>
              <Text>
                By clicking OK, you agree to our
                https://github.com/nravic/UrbanRefuge.
              </Text>
            </Hyperlink>
          </View>
          <TouchableOpacity
            style={styles.firstLaunchButton}
            onPress={() => this.componentDidMount()}>
            <Text style={{ color: '#ffffff' }}>OK</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../resources/img/background.png')}
            style={styles.background}>
            <View>
              <Text style={styles.logo}>Urban Refuge</Text>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <TouchableOpacity
                style={styles.TopButtonStyle}
                onPress={() =>
                  this.props.navigation.navigate('MainMap', {
                    locale: this.state.locale,
                  })
                }>
                <Text style={styles.textStyle}>
                  {i18n.t('homeScreen.view_map')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.BottomButtonStyle}
                onPress={() => this.setState({ locale: 'es' })}>
                <Text style={styles.BottomTextStyle}>
                  {i18n.t('homeScreen.lang_change')} - {this.state.locale}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    MainMap: Map,
    MarkerDetails: MarkerDetails,
  },
  {
    initialRouteName: 'Home',
  },
);

const styles = StyleSheet.create({
  logo: {
    fontFamily: 'Roboto',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
    color: '#062180',
    fontSize: 80,
    fontWeight: '500',
  },
  TopButtonStyle: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 5,
    borderColor: '#a3a3a3',
  },
  BottomButtonStyle: {
    padding: 10,
    marginTop: 275,
    marginLeft: 175,
    backgroundColor: '#062180',
    borderRadius: 3,
  },
  background: {
    flex: 3,
    alignSelf: 'flex-start',
    width: '100%',
    height: '110%',
  },
  BottomTextStyle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  topTextStyle: {
    color: '#062180',
  },
  firstLaunchText: {
    fontWeight: '100',
  },
  firstLaunchButton: {
    backgroundColor: '#062180',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
  },
});

export default createAppContainer(AppNavigator);
