import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.INITIAL_CONSONANT;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const InitialConsonantWritter = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default InitialConsonantWritter;
