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
import { createStackNavigator } from 'react-navigation-stack';
import i18n from '../utils/language/i18n';

const { width, height } = Dimensions.get('window');
const frameWidth = width;
const columnWidth = frameWidth / 3;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { firstLaunch: null, locale: i18n.locale };
  }

  render() {
    const { navigate } = this.props.navigation;
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
});

export default createAppContainer(AppNavigator);
