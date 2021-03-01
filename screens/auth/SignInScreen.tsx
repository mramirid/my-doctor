import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SignInScreen: React.FC = () => (
  <View style={styles.screen}>
    <Text>SIGN IN</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
