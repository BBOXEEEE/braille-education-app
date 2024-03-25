import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'InitialConsonantReader' },
  { name: '시험보기', screen: 'InitialConsonantRTester' }
];


const ReadInitialConsonant = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadInitialConsonant;
