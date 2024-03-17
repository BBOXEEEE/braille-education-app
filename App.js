import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ConsonantReader from './src/screens/reader/ConsonantReader';
import VowelReader from './src/screens/reader/VowelReader';
import FinalConsonantReader from './src/screens/reader/FinalConsonantReader';

export default function App() {
  return (
    <View style={styles.container}>
      <FinalConsonantReader />
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
