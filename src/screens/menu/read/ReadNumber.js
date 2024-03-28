import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'NumberReader' },
  { name: '시험보기', screen: 'NumberRTester' }
];

const ReadNumber = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadNumber;
