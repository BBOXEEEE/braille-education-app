import BrailleWritter from './BrailleWritter';

const WordWritter = ({ route }) => {
    const item = route.params.item;
    const category = "단어";
    let brailleSymbols = [];
    let brailleList = [];
    brailleSymbols.push(item.word);
    brailleList.push(item.braille);

    return <BrailleWritter category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default WordWritter;