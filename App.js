import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ConsonantReader from './src/screens/reader/ConsonantReader';

export default function App() {
  return (
    <View style={styles.container}>
      <ConsonantReader />
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
