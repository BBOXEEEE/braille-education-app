import BrailleRTester from '../../../components/BrailleRTester';
import BrailleList from '../../../constants/BrailleList';

const braille = BrailleList.ALPHABET;
const category = braille.category;;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const AlphabetRTester = () => {
    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default AlphabetRTester;