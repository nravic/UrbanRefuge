import React from 'react';
import { Alert, Icon, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/language/i18n';
import LanguageListItem from '../components/LanguageListItem';

const languages = [
  {
    locale: 'en',
    name: 'English'
  },
  {
    locale: 'es',
    name: 'Espanol',
    englishName: 'Spanish'
  }
];

class LanguageSettings extends React.Component {
  static navigationOptions = {
    title: 'Change Language'
  };

  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { currentLocale } = route.params;

    return (
      <View style={{ marginTop: 15 }}>
        {
          languages.map((language) => (
            <LanguageListItem
              key={language.locale}
              isActive={language.locale == currentLocale}
              locale={language.locale}
              name={language.name}
              englishName={language.englishName}
              onChangeLocale={(locale) => navigation.navigate('Home', { currentLocale: locale })}
            />
          ))
        }
      </View>
    );
  };
}

export default LanguageSettings;
