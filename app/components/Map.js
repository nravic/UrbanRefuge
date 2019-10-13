// app/components/Map.js
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import i18n from '../utils/language/i18n';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import MarkerDetails from './MarkerDetails';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const locations = { san_jose: 'san_jose' };

class Map extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const locale = navigation.getParam('locale');
    i18n.locale = locale;

    this.ref = firebase.firestore().collection(locations.san_jose);

    this.state = {
      region: null,
      markers: [],
      latitude: 37.3382,
      longitude: -121.8863,
      error: null,
      locale: i18n.locale,
      mapLoaded: false,
    };
  }

  async componentDidMount() {
    console.log(this.state);
    this.getPosition();
    this.getFirestoreData(null);
  }

  async getPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Urban Refuge',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      throw err;
      console.warn(err);
    }
  }

  async getPosition() {
    await Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          mapLoaded: true,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 100, maximumAge: 10 },
    );
    console.log('got position');
  }

  async getFirestoreData(query) {
    // conditions for filter
    this.setState({ markers: [] });

    if (query == null) {
      await firebase
        .firestore()
        .collection(locations.san_jose)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            this.state.markers.push(doc.data());
          });
        });
      this.setState({ mapLoaded: true });
    } else {
      await firebase
        .firestore()
        .collection(locations.san_jose)
        .where('Category', '==', query)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            this.state.markers.push(doc.data());
          });
        });
      console.log(this.state.markers);
    }
  }

  async filterData(query) {
    await this.getFirestoreData(query);
    await this.forceUpdate();
  }

  render() {
    if (this.state.mapLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            showsUserLocation={true}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.markers.map(marker => (
              <Marker
                key={marker.Name}
                coordinate={{
                  longitude: parseFloat(marker.Longitude),
                  latitude: parseFloat(marker.Latitude),
                }}
                title={marker.Name}
                description={marker.Category}
                onCalloutPress={() =>
                  this.props.navigation.navigate('MarkerDetails', {
                    name: marker['Name'],
                    category: marker['Category'],
                    address: marker['Address'],
                    website: marker['Website'],
                    physician_referral: marker['Physician Referral Required'],
                    ssn_required: marker['SSN Required'],
                    phone_number: marker['Phone Number'],
                    latitude: marker['Latitude'],
                    longitude: marker['Longitude'],
                    locale: this.state.locale,
                  })
                }
              />
            ))}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.filterData('Health')}>
              <Text styles={styles.buttonTextStyle}>
                {' '}
                {i18n.t('map.health')}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.filterData('Food')}>
              <Text styles={styles.buttonTextStyle}>
                {' '}
                {i18n.t('map.food')}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.filterData('Immigration')}>
              <Text styles={styles.buttonTextStyle}>
                {' '}
                {i18n.t('map.immigration')}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.filterData('Housing')}>
              <Text styles={styles.buttonTextStyle}>
                {' '}
                {i18n.t('map.housing')}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.TextContainer}>
          <Text> {i18n.t('map.loading')} ...</Text>
        </View>
      );
    }
  }
}

Map.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    flex: 10,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
});

export default Map;
