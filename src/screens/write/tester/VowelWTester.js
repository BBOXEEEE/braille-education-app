import BrailleWTester from "../../../components/BrailleWTester";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.VOWEL;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const VowelWTester = () => {
  return (
    <BrailleWTester
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default VowelWTester;
