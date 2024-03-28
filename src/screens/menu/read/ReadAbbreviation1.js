import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'AbbreviationReader1' },
  { name: '시험보기', screen: 'AbbreviationRTester1' }
];

const ReadAbbreviation1 = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadAbbreviation1;
