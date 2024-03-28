import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'VowelReader' },
  { name: '시험보기', screen: 'VowelRTester' }
];

const ReadVowel = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadVowel;
