import BrailleWTester from "../../../components/BrailleWTester";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.ALPHABET;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const AlphabetWTester = () => {
  return (
    <BrailleWTester
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default AlphabetWTester;
