// app/components/Map.js
import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import i18n from '../utils/language/i18n';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class Map extends React.Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    const { locale } = route.params;
    const { locationData } = route.params;
    console.log(locale);
    console.log(locationData);
    i18n.locale = locale;

    this.ref = firebase.firestore().collection(locationData.locationCode);

    this.state = {
      region: null,
      markers: [],
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      error: null,
      mapLoaded: false,
      locale: locale,
      location: locationData.locationCode
    };
  }

  async componentDidMount() {
    console.log(this.state);
    this.getFirestoreData(null);
  }


  async getFirestoreData(query) {
    // conditions for filter
    this.setState({ markers: [] });

    if (query == null) {
      await firebase
        .firestore()
        .collection(this.state.location)
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
        .collection(this.state.location)
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
    const currentLocale = this.state.locale;
    const { navigation } = this.props;

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
                description={i18n.t(marker.Category)}
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
