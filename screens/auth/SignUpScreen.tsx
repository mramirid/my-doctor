import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SignUpScreen: React.FC = () => (
  <View style={styles.screen}>
    <Text>SIGN UP</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
