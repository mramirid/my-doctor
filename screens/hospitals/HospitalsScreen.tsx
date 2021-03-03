import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';

const HospitalsScreen: React.FC = () => (
  <AppTabScreen contentStyle={styles.screenScrollViewContent}>
    <Text>Hospitals Screen</Text>
  </AppTabScreen>
);

const styles = StyleSheet.create({
  screenScrollViewContent: {
    paddingTop: 30,
    alignItems: 'center',
  },
});

export default HospitalsScreen;
