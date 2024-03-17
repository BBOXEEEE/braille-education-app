import React, { useState, useEffect, useRef } from 'react';
import BrailleReader from '../../components/BrailleReader';

const category = '숫자';
const brailleSimbols = ['수표', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const brailleList = [
    [0, 0, 1, 1, 1, 1], // 수표
    [0, 1, 0, 1, 1, 0], // 0
    [1, 0, 0, 0, 0, 0], // 1
    [1, 1, 0, 0, 0, 0], // 2
    [1, 0, 0, 1, 0, 0], // 3
    [1, 0, 0, 1, 1, 0], // 4
    [1, 0, 0, 0, 1, 0], // 5
    [1, 1, 0, 1, 0, 0], // 6
    [1, 1, 0, 1, 1, 0], // 7
    [1, 1, 0, 0, 1, 0], // 8
    [0, 1, 0, 1, 0, 0]  // 9
]

const NumberReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default NumberReader;