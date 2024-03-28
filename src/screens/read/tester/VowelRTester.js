import BrailleRTester from '../../../components/BrailleRTester';
import BrailleList from '../../../constants/BrailleList';

const braille = BrailleList.VOWEL;
const category = braille.category;;
const brailleSymbols = braille.symbols;
const brailleList = braille.braille;

const VowelRTester = () => {
    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default VowelRTester;