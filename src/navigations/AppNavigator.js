import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home
import Home from '../screens/Home';
import Splash from '../screens/Splash';

// Menu
import ReadMenu from '../screens/menu/read/ReadMenu';
import WriteMenu from '../screens/menu/write/WriteMenu'
import CameraMenu from '../screens/menu/camera/CameraMenu';
import VocabularyMenu from '../screens/menu/vocabulary/VocabularyMenu';

// Read
import ReadTutorial from '../screens/menu/read/ReadTutorial';
import ReadInitialConsonant from '../screens/menu/read/ReadInitialConsonant';
import InitialConsonantReader from '../screens/reader/InitialConsonantReader'
import VowelReader from '../screens/reader/VowelReader';
import FinalConsonantReader from '../screens/reader/FinalConsonantReader';
import Abbreviation1Reader from '../screens/reader/Abbreviation1Reader';
import Abbreviation2Reader from '../screens/reader/Abbreviation2Reader';
import Abbreviation3Reader from '../screens/reader/Abbreviation3Reader';
import NumberReader from '../screens/reader/NumberReader';
import AlphabetReader from '../screens/reader/AlphabetReader';

// Write
import WriteTutorial from '../screens/menu/write/WriteTutorial';
import WriteInitialConsonant from '../screens/menu/write/WriteInitialConsonant';
import InitialConsonantWritter from '../screens/writter/InitialConsonantWritter';

// Camera

// Voca


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        {/* Menu */}
        <Stack.Screen name="ReadMenu" component={ReadMenu} />
        <Stack.Screen name="WriteMenu" component={WriteMenu} />
        <Stack.Screen name="CameraMenu" component={CameraMenu} />
        <Stack.Screen name="VocabularyMenu" component={VocabularyMenu} />
        {/* Read */}
        <Stack.Screen name="ReadTutorial" component={ReadTutorial} />
        <Stack.Screen name="ReadInitialConsonant" component={ReadInitialConsonant} />
        <Stack.Screen name="InitialConsonantReader" component={InitialConsonantReader} />
        {/* Write */}
        <Stack.Screen name="WriteTutorial" component={WriteTutorial} />
        <Stack.Screen name="WriteInitialConsonant" component={WriteInitialConsonant} />
        <Stack.Screen name="InitialConsonantWritter" component={InitialConsonantWritter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
