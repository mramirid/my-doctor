import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MessagesScreen: React.FC = () => (
  <View style={styles.screen}>
    <Text>Messages Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessagesScreen;
