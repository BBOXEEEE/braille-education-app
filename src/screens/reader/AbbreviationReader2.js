import BrailleReader from '../../components/BrailleReader';

const category = '약어 2단계';
const brailleSimbols = [
    '까', '따', '빠', '싸', '짜', '갓', '낫', '닷', '맛', '밧', '샀', '캈', '탔', '팠', '핬',
    '성', '정', '청', '썽', '쩡'
]
const brailleList = [
    
]

const AbbreviationReader2 = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default AbbreviationReader2;