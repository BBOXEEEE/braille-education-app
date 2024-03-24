import BrailleReader from '../../../components/BrailleReader';
import BrailleList from '../../../constants/BrailleList';

const initialConsonant = BrailleList.ALPHABET;
const category = initialConsonant.category;;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const AlphabetReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default AlphabetReader;