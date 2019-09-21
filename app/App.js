import React from 'react';
import HomeScreen from './components/HomeScreen';
import i18n from './utils/language/i18n';

class App extends React.Component {
  state = {
    locale: i18n.locale,
  };

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  render() {
    console.log(this.props.state); // eslint-disable-line
    return <HomeScreen />;
  }
}

export default App;
