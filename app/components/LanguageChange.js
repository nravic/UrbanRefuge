import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import i18n from '../utils/language/i18n';

class LanguageChange extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locale: i18n.locale };
  }
  render() {}
}
