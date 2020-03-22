import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/Map';
import HomeScreen from '../screens/HomeScreen';
import LanguageSettings from '../screens/LanguageSettings';
import MarkerDetails from '../screens/MarkerDetails';
import LocationSettings from '../screens/LocationSettings.js';
// import screens

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
      />
      <Stack.Screen
        name='LanguageSettings'
        component={LanguageSettings}
      />
      <Stack.Screen
        name='LocationSettings'
        component={LocationSettings}
      />
      <Stack.Screen
        name='MainMap'
        component={Map}
      />
      <Stack.Screen
        name='MarkerDetails'
        component={MarkerDetails}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
