import React from 'react';
import { Alert, Icon, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/language/i18n';
import LocationListItem from '../components/LocationListItem';

const locations = [
  {
    locationCode: 'san_jose',
    name: 'San Jose',
    latitude: 37.3382,
    longitude: -121.8863
  }
];

class LocationSettings extends React.Component {

  static navigationOptions = {
    title: 'Select Location'
  };

  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { locale } = route.params;

    return (
      <View style={{ marginTop: 15 }}>
        {
          locations.map((locationData) => (
            <LocationListItem
              key={locationData.locationCode}
              locationData={locationData}
              name={locationData.name}
              onChangeLocation={(location) => navigation.navigate('MainMap',
                {
                  locationData: locationData,
                  locale: locale
                }
              )}
            />
          ))
        }
      </View>
    );
  };
}

export default LocationSettings;
