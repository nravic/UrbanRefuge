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
    const { route } = this.props;
    const { locale } = route.params;
    i18n.locale = locale;
  }

  render() {
    const { route } = this.props;
    const markerData = route.params;
    console.log(markerData);
    const stringNotAvailable = 'Data not Available';

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
            : {JSON.parse(JSON.stringify(markerData.name))}
          </Text>

          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.website')}
            </Text>
            : {JSON.parse(JSON.stringify(markerData.website))}
          </Text>

          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.phys_refer')}
            </Text>
            : {JSON.parse(JSON.stringify(markerData.physician_referral))}
          </Text>

          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.ssn_req')}
            </Text>
            : {JSON.parse(JSON.stringify(markerData.ssn_required))}
          </Text>

          <Text>
            <Text styles={styles.categoryTextStyle}>
              {i18n.t('details.phone_num')}
            </Text>
            : {(JSON.stringify(markerData.phone_number))}
          </Text>


          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Linking.openURL(markerData.navigationURL)}>
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
