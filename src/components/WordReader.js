import BrailleReader from './BrailleReader';

const WordReader = ({ route }) => {
    const item = route.params.item;
    const category = "단어";
    let brailleSymbols = [];
    let brailleList = [];
    brailleSymbols.push(item.word);
    brailleList.push(item.braille);

    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default WordReader;