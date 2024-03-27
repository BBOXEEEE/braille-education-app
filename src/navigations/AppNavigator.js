import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Home
import Home from "../screens/Home";
import Splash from "../screens/Splash";

// Menu
import TutorialMenu from "../screens/menu/tutorial/TutorialMenu";
import ReadMenu from "../screens/menu/read/ReadMenu";
import WriteMenu from "../screens/menu/write/WriteMenu";
import CameraMenu from "../screens/menu/camera/CameraMenu";
import VocabularyMenu from "../screens/menu/vocabulary/VocabularyMenu";


// Read
import ReadTutorial from "../screens/menu/read/ReadTutorial";
import ReadInitialConsonant from "../screens/menu/read/ReadInitialConsonant";
import ReadVowel from "../screens/menu/read/ReadVowel";
import ReadFinalConsonant from "../screens/menu/read/ReadFinalConsonant";
import ReadAbbreviation1 from "../screens/menu/read/ReadAbbreviation1";
import ReadAbbreviation2 from "../screens/menu/read/ReadAbbreviation2";
import ReadAbbreviation3 from "../screens/menu/read/ReadAbbreviation3";
import ReadNumber from "../screens/menu/read/ReadNumber";
import ReadAlphabet from "../screens/menu/read/ReadAlphabet";

import InitialConsonantReader from "../screens/read/reader/InitialConsonantReader";
import VowelReader from "../screens/read/reader/VowelReader";
import FinalConsonantReader from "../screens/read/reader/FinalConsonantReader";
import AbbreviationReader1 from "../screens/read/reader/AbbreviationReader1";
import AbbreviationReader2 from "../screens/read/reader/AbbreviationReader2";
import AbbreviationReader3 from "../screens/read/reader/AbbreviationReader3";
import NumberReader from "../screens/read/reader/NumberReader";
import AlphabetReader from "../screens/read/reader/AlphabetReader";

import InitialConsonantRTester from "../screens/read/tester/InitialConsonantRTester";

// Write
import WriteTutorial from "../screens/menu/write/WriteTutorial";
import WriteInitialConsonant from "../screens/menu/write/WriteInitialConsonant";
import WriteVowel from "../screens/menu/write/WriteVowel";
import WriteFinalConsonant from "../screens/menu/write/WriteFinalConsonant";
import WriteAbbreviation1 from "../screens/menu/write/WriteAbbreviation1";
import WriteAbbreviation2 from "../screens/menu/write/WriteAbbreviation2";
import WriteAbbreviation3 from "../screens/menu/write/WriteAbbreviation3";
import WriteNumber from "../screens/menu/write/WriteNumber";
import WriteAlphabet from "../screens/menu/write/WriteAlphabet";

import InitialConsonantWritter from "../screens/write/writter/InitialConsonantWritter";
import VowelWritter from "../screens/write/writter/VowelWritter";
import FinalConsonantWritter from "../screens/write/writter/FinalConsonantWritter";
import AbbreviationWritter1 from "../screens/write/writter/AbbreviationWritter1";
import AbbreviationWritter2 from "../screens/write/writter/AbbreviationWritter2";
import AbbreviationWritter3 from "../screens/write/writter/AbbreviationWritter3";
import NumberWritter from "../screens/write/writter/NumberWritter";
import AlphabetWritter from "../screens/write/writter/AlphabetWritter";

import InitialConsonantWTester from "../screens/write/tester/InitialConsonantWTester";

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
        <Stack.Screen name="TutorialMenu" component={TutorialMenu} />
        <Stack.Screen name="ReadMenu" component={ReadMenu} />
        <Stack.Screen name="WriteMenu" component={WriteMenu} />
        <Stack.Screen name="CameraMenu" component={CameraMenu} />
        <Stack.Screen name="VocabularyMenu" component={VocabularyMenu} />
        {/* Read */}
        <Stack.Screen name="ReadTutorial" component={ReadTutorial} />
        <Stack.Screen name="ReadInitialConsonant" component={ReadInitialConsonant} />
        <Stack.Screen name="ReadVowel" component={ReadVowel} />
        <Stack.Screen name="ReadFinalConsonant" component={ReadFinalConsonant} />
        <Stack.Screen name="ReadAbbreviation1" component={ReadAbbreviation1} />
        <Stack.Screen name="ReadAbbreviation2" component={ReadAbbreviation2} />
        <Stack.Screen name="ReadAbbreviation3" component={ReadAbbreviation3} />
        <Stack.Screen name="ReadNumber" component={ReadNumber} />
        <Stack.Screen name="ReadAlphabet" component={ReadAlphabet} />

        <Stack.Screen name="InitialConsonantReader" component={InitialConsonantReader} />
        <Stack.Screen name="VowelReader" component={VowelReader} />
        <Stack.Screen name="FinalConsonantReader" component={FinalConsonantReader} />
        <Stack.Screen name="AbbreviationReader1" component={AbbreviationReader1} />
        <Stack.Screen name="AbbreviationReader2" component={AbbreviationReader2} />
        <Stack.Screen name="AbbreviationReader3" component={AbbreviationReader3} />
        <Stack.Screen name="NumberReader" component={NumberReader} />
        <Stack.Screen name="AlphabetReader" component={AlphabetReader} />

        <Stack.Screen name="InitialConsonantRTester" component={InitialConsonantRTester} />

        {/* Write */}
        <Stack.Screen name="WriteTutorial" component={WriteTutorial} />
        <Stack.Screen name="WriteInitialConsonant" component={WriteInitialConsonant} />
        <Stack.Screen name="WriteVowel" component={WriteVowel} />
        <Stack.Screen name="WriteFinalConsonant" component={WriteFinalConsonant} />
        <Stack.Screen name="WriteAbbreviation1" component={WriteAbbreviation1} />
        <Stack.Screen name="WriteAbbreviation2" component={WriteAbbreviation2} />
        <Stack.Screen name="WriteAbbreviation3" component={WriteAbbreviation3} />
        <Stack.Screen name="WriteNumber" component={WriteNumber} />
        <Stack.Screen name="WriteAlphabet" component={WriteAlphabet} />
		
        <Stack.Screen name="InitialConsonantWritter" component={InitialConsonantWritter} />
        <Stack.Screen name="VowelWritter" component={VowelWritter} />
        <Stack.Screen name="FinalConsonantWritter" component={FinalConsonantWritter} />
        <Stack.Screen name="AbbreviationWritter1" component={AbbreviationWritter1} />
        <Stack.Screen name="AbbreviationWritter2" component={AbbreviationWritter2} />
        <Stack.Screen name="AbbreviationWritter3" component={AbbreviationWritter3} />
        <Stack.Screen name="NumberWritter" component={NumberWritter} />
        <Stack.Screen name="AlphabetWritter" component={AlphabetWritter} />

        <Stack.Screen name="InitialConsonantWTester" component={InitialConsonantWTester} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
