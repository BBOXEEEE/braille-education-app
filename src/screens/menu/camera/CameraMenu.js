import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CameraMenu = () => {
  return (
    <View style={styles.container}>
      <Text>Reading Screen</Text>
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

export default CameraMenu;
