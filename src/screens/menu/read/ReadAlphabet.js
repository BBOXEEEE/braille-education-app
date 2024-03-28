import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'AlphabetReader' },
  { name: '시험보기', screen: 'AlphabetRTester' }
];

const ReadAlphabet = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadAlphabet;
