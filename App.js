import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import AppNavigator from './src/navigations/AppNavigator';
import { TTSProvider } from './src/components/TTSContext';

export default function App() {
  return (
    <TTSProvider>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="auto" />
      </View>
    </TTSProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: Platform.OS === 'android' ? '54': '44',
    marginTop: Platform.OS === 'android' ? 40 : 0,
  },
});
