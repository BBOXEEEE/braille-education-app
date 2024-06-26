import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Home
import Home from "../screens/Home";

// Menu
import ReadMenu from "../screens/menu/read/ReadMenu";
import WriteMenu from "../screens/menu/write/WriteMenu";

// Tutorial
import TutorialMenu from "../screens/tutorial/TutorialMenu";
import TutorialFunction from "../screens/tutorial/TutorialFunction";
import ReadTutorial from "../screens/tutorial/ReadTutorial";
import ReadTestTutorial from "../screens/tutorial/ReadTestTutorial";
import ReadPractice from "../screens/tutorial/ReadPractice";
import ReadTestPractice from "../screens/tutorial/ReadTestPractice";
import WriteTutorial from "../screens/tutorial/WriteTutorial";
import WriteTestTutorial from "../screens/tutorial/WriteTestTutorial";
import WritePractice from "../screens/tutorial/WritePractice";
import WriteTestPractice from "../screens/tutorial/WriteTestPractice";

// Read
import ReadTutorialMenu from "../screens/tutorial/ReadTutorialMenu";
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
import VowelRTester from "../screens/read/tester/VowelRTester";
import FinalConsonantRTester from "../screens/read/tester/FinalConsonantRTester";
import AbbreviationRTester1 from "../screens/read/tester/AbbreviationRTester1";
import AbbreviationRTester2 from "../screens/read/tester/AbbreviationRTester2";
import AbbreviationRTester3 from "../screens/read/tester/AbbreviationRTester3";
import NumberRTester from "../screens/read/tester/NumberRTester";
import AlphabetRTester from "../screens/read/tester/AlphabetRTester";

// Write
import WriteTutorialMenu from "../screens/tutorial/WriteTutorialMenu";
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
import VowelWTester from "../screens/write/tester/VowelWTester";
import FinalConsonantWTester from "../screens/write/tester/FinalConsonantWTester";
import AbbreviationWTester1 from "../screens/write/tester/AbbreviationWTester1";
import AbbreviationWTester2 from "../screens/write/tester/AbbreviationWTester2";
import AbbreviationWTester3 from "../screens/write/tester/AbbreviationWTester3";
import AlphabetWTester from "../screens/write/tester/AlphabetWTester";
import NumberWTester from "../screens/write/tester/NumberWTester";

// Camera
import CameraModule from "../screens/camera/CameraModule";

// Record
import RecordModule from "../screens/record/RecordModule";

// Voca
import VocabularyModule from "../screens/vocabulary/VocabularyModule";

// Components
import ObjectList from "../components/ObjectList";
import SelectMode from "../components/SelectMode";
import WordReader from "../components/WordReader";
import WordWritter from "../components/WordWritter";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Home" component={Home} />

        {/* Menu */}
        <Stack.Screen name="ReadMenu" component={ReadMenu} />
        <Stack.Screen name="WriteMenu" component={WriteMenu} />

        {/* Tutorial */}
        <Stack.Screen name="TutorialMenu" component={TutorialMenu} />
        <Stack.Screen name="TutorialFunction" component={TutorialFunction}/>
        <Stack.Screen name="ReadTutorial" component={ReadTutorial} />
        <Stack.Screen name="ReadTestTutorial" component={ReadTestTutorial} />
        <Stack.Screen name="ReadPractice" component={ReadPractice} />
        <Stack.Screen name="ReadTestPractice" component={ReadTestPractice} />
        <Stack.Screen name="WriteTutorial" component={WriteTutorial} />
        <Stack.Screen name="WriteTestTutorial" component={WriteTestTutorial} />
        <Stack.Screen name="WritePractice" component={WritePractice} />
        <Stack.Screen name="WriteTestPractice" component={WriteTestPractice} />
        
        {/* Read */}
        <Stack.Screen name="ReadTutorialMenu" component={ReadTutorialMenu} />
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
        <Stack.Screen name="VowelRTester" component={VowelRTester} />
        <Stack.Screen name="FinalConsonantRTester" component={FinalConsonantRTester} />
        <Stack.Screen name="AbbreviationRTester1" component={AbbreviationRTester1} />
        <Stack.Screen name="AbbreviationRTester2" component={AbbreviationRTester2} />
        <Stack.Screen name="AbbreviationRTester3" component={AbbreviationRTester3} />
        <Stack.Screen name="NumberRTester" component={NumberRTester} />
        <Stack.Screen name="AlphabetRTester" component={AlphabetRTester} />

        {/* Write */}
        <Stack.Screen name="WriteTutorialMenu" component={WriteTutorialMenu} />
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
        <Stack.Screen name="VowelWTester" component={VowelWTester} />
        <Stack.Screen name="FinalConsonantWTester" component={FinalConsonantWTester} />
        <Stack.Screen name="AbbreviationWTester1" component={AbbreviationWTester1} />
        <Stack.Screen name="AbbreviationWTester2" component={AbbreviationWTester2} />
        <Stack.Screen name="AbbreviationWTester3" component={AbbreviationWTester3} />
        <Stack.Screen name="AlphabetWTester" component={AlphabetWTester} />
        <Stack.Screen name="NumberWTester" component={NumberWTester} />

        {/* Camera */}
        <Stack.Screen name="CameraModule" component={CameraModule} />

        {/* Record */}
        <Stack.Screen name="RecordModule" component={RecordModule} />

        {/* Voca */}
        <Stack.Screen name="VocabularyModule" component={VocabularyModule} />

        {/* Components */}
        <Stack.Screen name="ObjectList" component={ObjectList} />
        <Stack.Screen name="SelectMode" component={SelectMode} />
        <Stack.Screen name="WordReader" component={WordReader} />
        <Stack.Screen name="WordWritter" component={WordWritter} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
