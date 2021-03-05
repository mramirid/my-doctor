import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ChatItemProps {
  text: string;
}

const ChatItem: React.FC<ChatItemProps> = (props) => (
  <View style={styles.container}>
    <Text>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {},
});

export default ChatItem;
