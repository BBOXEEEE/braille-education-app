import BrailleReader from '../../components/BrailleReader';

const category = '약어 3단계';
const brailleSimbols = ['그래서', '그러나', '그러면', '그러므로', '그런데', '그리고', '그리하여']
const brailleList = [
    
]

const AbbreviationReader3 = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default AbbreviationReader3;