import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HospitalsScreen: React.FC = () => (
  <View style={styles.screen}>
    <Text>Hospitals Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HospitalsScreen;
