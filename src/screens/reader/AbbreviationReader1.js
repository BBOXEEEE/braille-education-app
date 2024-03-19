import BrailleReader from '../../components/BrailleReader';
import BrailleList from '../../constants/BrailleList';

const initialConsonant = BrailleList.ABBREVIATION_FIRST;
const category = initialConsonant.category;;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const AbbreviationReader1 = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default AbbreviationReader1;