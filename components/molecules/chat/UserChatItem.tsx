import { format } from 'date-fns';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import { Chat } from '../../../types/chat';
import AppCard from '../../atoms/AppCard';

type Props = Readonly<{
  chat: Chat;
  style?: StyleProp<ViewStyle>;
}>;

export default function UserChatItem(props: Props) {
  return (
    <View style={[styles.container, props.style]}>
      <AppCard style={styles.messageContainer}>
        <Text style={styles.message}>{props.chat.content}</Text>
      </AppCard>
      <Text style={styles.timestamp}>{format(props.chat.timestamp, 'hh:mm a')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageContainer: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: Colors.Green1,
    borderBottomRightRadius: 0,
  },
  message: {
    fontSize: 14,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 8,
  },
});
