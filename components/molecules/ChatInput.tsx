import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = (props) => (
  <View style={styles.container}>
    <Text>Chat Input Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {},
});

export default ChatInput;
