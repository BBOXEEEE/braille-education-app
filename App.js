import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ConsonantReader from './src/screens/reader/ConsonantReader';
import VowelReader from './src/screens/reader/VowelReader';

export default function App() {
  return (
    <View style={styles.container}>
      <VowelReader />
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
