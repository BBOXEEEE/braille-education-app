import React, { useState, useEffect, useRef } from 'react';
import BrailleReader from '../../components/BrailleReader';

const brailleSimbols = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅍ', 'ㅌ', 'ㅎ']
const brailleList = [
    [0, 0, 0, 1, 0, 0], // ㄱ
    [1, 0, 0, 1, 0, 0], // ㄴ
    [0, 1, 0, 1, 0, 0], // ㄷ
    [0, 0, 0, 0, 1, 0], // ㄹ
    [1, 0, 0, 0, 1, 0], // ㅁ
    [0, 0, 0, 1, 1, 0], // ㅂ
    [0, 0, 0, 0, 0, 1], // ㅅ
    [0, 0, 0, 1, 0, 1], // ㅈ
    [0, 0, 0, 0, 1, 1], // ㅊ
    [1, 1, 0, 1, 0, 0], // ㅋ
    [1, 1, 0, 0, 1, 0], // ㅍ
    [1, 0, 0, 1, 1, 0], // ㅌ
    [0, 1, 0, 1, 1, 0]  // ㅎ
]

const ConsonantReader = () => {
    return <BrailleReader brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default ConsonantReader;