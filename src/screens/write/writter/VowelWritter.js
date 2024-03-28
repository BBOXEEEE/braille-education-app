import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.VOWEL;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const VowelWritter = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default VowelWritter;
