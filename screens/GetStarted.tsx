import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import AppLogo from '../components/ui/AppLogo';

const GetStarted: FC = () => (
  <View style={styles.screen}>
    <AppLogo />
  </View>
);

const styles = StyleSheet.create({
  screen: {},
});

export default GetStarted;
