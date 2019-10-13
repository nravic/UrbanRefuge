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
        <View
          style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Text styles={styles.detailsTextStyle}>
            {i18n.t('details.details')}
          </Text>
          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.name')}
            </Text>
            : {JSON.parse(JSON.stringify(name))}
          </Text>
          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.website')}
            </Text>
            : {JSON.parse(JSON.stringify(website))}
          </Text>

          {physician_referral == '' ? (
            <Text>
              {' '}
              <Text styles={styles.categoryTextStyle}>
                {i18n.t('details.phys_refer')}
              </Text>
              :{JSON.parse(JSON.stringify(physician_referral))}
            </Text>
          ) : (
            <Text>
              <Text styles={styles.categoryTextStyle}>
                {i18n.t('details.phys_refer')}
              </Text>
              : {stringNotAvailable}
            </Text>
          )}

          {ssn_required == '' ? (
            <Text>
              <Text styles={styles.categoryTextStyle}>
                {i18n.t('details.ssn_req')}
              </Text>
              : {JSON.parse(JSON.stringify(ssn_required))}
            </Text>
          ) : (
            <Text>
              {i18n.t('details.ssn_req')}: {stringNotAvailable}
            </Text>
          )}

          {phone_number == '' ? (
            <Text>
              <Text styles={styles.categoryTextStyle}>
                {i18n.t('details.phone_num')}
              </Text>
              :{JSON.parse(JSON.stringify(phone_num))}
            </Text>
          ) : (
            <Text>
              <Text styles={styles.categoryTextStyle}>
                {i18n.t('details.phone_num')}
              </Text>
              : {stringNotAvailable}
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
    fontFamily: 'roboto',
  },
  detailsTextStyle: {
    fontFamily: 'roboto',
    fontSize: 50,
    fontWeight: '100',
  },
});

export default MarkerDetails;
