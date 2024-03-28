import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'AbbreviationReader2' },
  { name: '시험보기', screen: 'AbbreviationRTester2' }
];

const ReadAbbreviation2 = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadAbbreviation2;
