import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/main/SplashScreen';
import MainScreen from '../screens/main/MainScreen';
import ReadingScreen from '../screens/main/firstscreens/ReadingScreen';
import WritingScreen from '../screens/main/firstscreens/WritingScreen';
import ShootingScreen from '../screens/main/firstscreens/ShootingScreen';
import VocabularyScreen from '../screens/main/firstscreens/VocabularyScreen';
import RTutorialScreen from '../screens/main/firstscreens/secondscreens/RTutorialScreen';
import RConsonantScreen from '../screens/main/firstscreens/secondscreens/RConsonantScreen';

import WTutorialScreen from '../screens/main/firstscreens/secondscreens/WTutorialScreen';
import WConsonantScreen from '../screens/main/firstscreens/secondscreens/WConsonantScreen';

import InitialConsonantReader from '../screens/reader/InitialConsonantReader'

import InitialConsonantWritter from '../screens/writter/InitialConsonantWritter';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
        <Stack.Screen name="Writing" component={WritingScreen} />
        {/*<Stack.Screen name="ReadingWritingScreen" component={ReadingWritingScreen} />*/}
        <Stack.Screen name="Shooting" component={ShootingScreen} />
        <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
        <Stack.Screen name="RTutorialScreen" component={RTutorialScreen} />
        <Stack.Screen name="RConsonantScreen" component={RConsonantScreen} />
        <Stack.Screen name="WTutorialScreen" component={WTutorialScreen} />
        <Stack.Screen name="WConsonantScreen" component={WConsonantScreen} />
        <Stack.Screen name="InitialConsonantReader" component={InitialConsonantReader} />
        <Stack.Screen name="InitialConsonantWritter" component={InitialConsonantWritter} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
