import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VocabularyMenu = () => {
  return (
    <View style={styles.container}>
      <Text>Tutorial Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default VocabularyMenu;
