import BrailleWTester from '../../components/BrailleWTester';

const WriteTestPractice = ({ route }) => {
    const category = route.params.category;
    const brailleSymbols = route.params.brailleSymbols;
    const brailleList = route.params.brailleList;

    return <BrailleWTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default WriteTestPractice;