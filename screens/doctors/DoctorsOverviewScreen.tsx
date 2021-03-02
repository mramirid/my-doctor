import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const DoctorsOverviewScreenScreen: React.FC = () => (
  <View style={styles.screen}>
    <Text>Doctors Overview Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoctorsOverviewScreenScreen;
