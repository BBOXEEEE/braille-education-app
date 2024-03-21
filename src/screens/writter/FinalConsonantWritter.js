import BrailleWritter from "../../components/BrailleWritter";
import BrailleList from "../../constants/BrailleList";

const initialConsonant = BrailleList.FINAL_CONSONANT;
const category = initialConsonant.category;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const FinalConsonantWritter = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default FinalConsonantWritter;
