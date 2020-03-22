import React from 'react';
import { Alert, Icon, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/language/i18n';

class LanguageListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  handleLocaleChange() {
    Alert.alert(
      i18n.t('languageList.change_language'),
      null,
      [
        {
          text: i18n.t('languageList.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('languageList.ok'),
          onPress: () => this.props.onChangeLocale(this.props.locale),
          style: 'destructive'
        }
      ]
    );
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={this.handleLocaleChange}
      >
        <View style={styles.textWrapper}>
          <Text style={[
            styles.title, (this.props.isActive && styles.active)
          ]}>
            {this.props.name}
          </Text>
          {
            this.props.englishName &&
            <Text style={styles.subtitle}>{this.props.englishName}</Text>
          }
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

export default LanguageListItem;
