import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/main/SplashScreen';
import MainScreen from '../screens/main/MainScreen';
import ReadingScreen from '../screens/main/firstscreens/ReadingScreen';
import WritingScreen from '../screens/main/firstscreens/WritingScreen';
import ShootingScreen from '../screens/main/firstscreens/ShootingScreen';
import VocabularyScreen from '../screens/main/firstscreens/VocabularyScreen';
import TutorialScreen from '../screens/main/firstscreens/secondscreens/TutorialScreen';

import InitialConsonantReader from '../screens/reader/InitialConsonantReader';

import InitialConsonantWritter from '../screens/writter/InitialConsonantWritter';

//import ReadingWriting from '../screens/main/firstscreens/secondscreens/ReadingWritingScreen';


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
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
        <Stack.Screen name="InitialConsonantReader" component={InitialConsonantReader} />
        <Stack.Screen name="InitialConsonantWritter" component={InitialConsonantWritter} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
