import BrailleRTester from '../../components/BrailleRTester';

const ReadTestPractice = ({ route }) => {
    const category = route.params.category;
    const brailleSymbols = route.params.brailleSymbols;
    const brailleList = route.params.brailleList;

    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default ReadTestPractice;