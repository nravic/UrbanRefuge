import React from 'react';
import { Alert, Icon, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/language/i18n';

class LocationListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange() {
    Alert.alert(
      i18n.t('languagelist.change_language'),
      null,
      [
        {
          text: i18n.t('languageList.cancel'),
          style: 'cance'
        },
        {
          text: i18n.t('languageList.ok'),
          onPress: () => this.props.onChangeLocation(this.props.locationData),
          style: 'destructive'
        }
      ]
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={this.handleLocationChange}
      >
        <View style={styles.textWrapper}>
          <Text style={[
            styles.title, (this.props.isActive && styles.active)
          ]}>
            {this.props.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  textWrapper: {
    width: '90%',
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    color: '#434343'
  },
  subtitle: {
    color: '#AAAAAA'
  },
  active: {
    color: '#03a87c'
  }
});

export default LocationListItem;
