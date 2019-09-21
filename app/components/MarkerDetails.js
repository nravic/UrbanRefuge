import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import i18n from '../utils/language/i18n';

class MarkerDetails extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const locale = navigation.getParam('locale');
    i18n.locale = locale;
  }

  render() {
    const { navigation } = this.props;
    const stringNotAvailable = 'No Information Available';
    // Marker details from firebase
    const name = navigation.getParam('name', 'No Address');
    const address = navigation.getParam('address', 'No Address');
    const website = navigation.getParam('website', 'No Website');
    const physician_referral = navigation.getParam(
      'physician_referral',
      stringNotAvailable,
    );
    const ssn_required = navigation.getParam(
      'ssn_required',
      stringNotAvailable,
    );
    const phone_number = navigation.getParam('phone_number', 'No Phone Number');
    const latitude = JSON.parse(
      JSON.stringify(navigation.getParam('latitude', '0.0')),
    );
    const longitude = JSON.parse(
      JSON.stringify(navigation.getParam('longitude', '0.0')),
    );
    const navigationURL = 'geo:0,0?q=' + latitude + ',' + longitude;

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.background}
          source={require('../resources/img/sj_background.png')}>
          <View
            style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
            <Text styles={styles.detailsTextStyle}>
              {i18n.t('details.details')}
            </Text>

            <Text styles={{ fontWeight: 'bold' }}>
              {i18n.t('details.name')}: {JSON.parse(JSON.stringify(name))}
            </Text>

            <Text>
              {i18n.t('details.website')}: {JSON.parse(JSON.stringify(website))}
            </Text>

            {physician_referral == '' ? (
              <Text>
                {i18n.t('details.phys_refer')}:
                {JSON.parse(JSON.stringify(physician_referral))}
              </Text>
            ) : (
              <Text>
                {i18n.t('details.phys_refer')}: {stringNotAvailable}
              </Text>
            )}

            {ssn_required == '' ? (
              <Text>
                {i18n.t('details.ssn_req')}:{' '}
                {JSON.parse(JSON.stringify(ssn_required))}
              </Text>
            ) : (
              <Text>
                {i18n.t('details.ssn_req')}: {stringNotAvailable}
              </Text>
            )}

            {phone_number == '' ? (
              <Text>
                {i18n.t('details.phone_num')}:
                {JSON.parse(JSON.stringify(phone_num))}
              </Text>
            ) : (
              <Text>
                {i18n.t('details.phone_num')}: {stringNotAvailable}
              </Text>
            )}

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => Linking.openURL(navigationURL)}>
              <Text style={styles.buttonTextStyle}>
                {i18n.t('details.open_map')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#062180',
    borderRadius: 5,
  },
  background: {
    flex: 2,
    //alignSelf: 'flex-start',
    width: '100%',
    height: '50%',
  },
  buttonTextStyle: {
    color: '#ffffff',
  },
  descTextStyle: {
    fontWeight: 'normal',
  },
  categoryTextStyle: {
    fontWeight: 'bold',
  },
  detailsTextStyle: {
    fontSize: 50,
    fontWeight: '100',
  },
});

export default MarkerDetails;
