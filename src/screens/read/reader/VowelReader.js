import BrailleReader from '../../../components/BrailleReader';
import BrailleList from '../../../constants/BrailleList';

const initialConsonant = BrailleList.VOWEL;
const category = initialConsonant.category;;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const VowelReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default VowelReader;