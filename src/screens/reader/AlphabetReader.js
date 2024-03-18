import BrailleReader from '../../components/BrailleReader';

const category = '영어';
const brailleSimbols = [
    '영어시작', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '영어 끝'
]
const brailleList = [
    [0, 0, 1, 0, 1, 1], // 영어 끝
    [1, 0, 0, 0, 0, 0], // a
    [1, 1, 0, 0, 0, 0], // b
    [1, 0, 0, 1, 0, 0], // c
    [1, 0, 0, 1, 1, 0], // d
    [1, 0, 0, 0, 1, 0], // e
    [1, 1, 0, 1, 0, 0], // f
    [1, 1, 0, 1, 1, 0], // g
    [1, 1, 0, 0, 1, 0], // h
    [0, 1, 0, 1, 0, 0], // i
    [0, 1, 0, 1, 1, 0], // j
    [1, 0, 1, 0, 0, 0], // k
    [1, 1, 1, 0, 0, 0], // l
    [1, 0, 1, 1, 0, 0], // m
    [1, 0, 1, 1, 1, 0], // n
    [1, 0, 1, 0, 1, 0], // o
    [1, 1, 1, 1, 0, 0], // p
    [1, 1, 1, 1, 1, 0], // q
    [1, 1, 1, 0, 1, 0], // r
    [0, 1, 1, 1, 0, 0], // s
    [0, 1, 1, 1, 1, 0], // t
    [1, 0, 1, 0, 0, 1], // u
    [1, 1, 1, 0, 0, 1], // v
    [0, 1, 0, 1, 1, 1], // w
    [1, 0, 1, 1, 0, 1], // x
    [1, 0, 1, 1, 1, 1], // y
    [1, 0, 1, 0, 1, 1], // z
    [0, 1, 0, 0, 1, 1], // 영어 끝
]

const AlphabetReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default AlphabetReader;