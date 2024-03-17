import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BrailleConsonantReader from './src/screens/reader/BrailleConsonantReader';

export default function App() {
  return (
    <View style={styles.container}>
      <BrailleConsonantReader />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
