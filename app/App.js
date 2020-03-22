import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import MainStackNavigator from './navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';

const App: () => React$Node = () => {
    return (
	<NavigationContainer>
	    <MainStackNavigator />
	</NavigationContainer>
    );
};

export default App;
