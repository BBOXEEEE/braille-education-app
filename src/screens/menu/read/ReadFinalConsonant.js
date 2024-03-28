import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 


const steps = [
  { name: '학습하기', screen: 'FinalConsonantReader' },
  { name: '시험보기', screen: 'FinalConsonantRTester' }
];

const ReadFinalConsonant = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadFinalConsonant;
