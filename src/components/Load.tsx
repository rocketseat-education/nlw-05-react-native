import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';

export const Load = () => (
  <View style={styles.container}>
    <LottieView loop autoPlay style={styles.animation} source={loadAnimation} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
});
