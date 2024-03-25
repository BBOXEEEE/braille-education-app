import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'InitialConsonantWritter' },
  { name: '시험보기', screen: 'InitialConsonantWTester' }
];

const WriteInitialConsonant = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteInitialConsonant;
