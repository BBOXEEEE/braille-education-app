import BrailleWritter from "../../components/BrailleWritter";
import BrailleList from "../../constants/BrailleList";

const initialConsonant = BrailleList.VOWEL;
const category = initialConsonant.category;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

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
