import { format } from 'date-fns';
import React, { FC } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import { Chat } from '../../../global-types/chatting';
import AppCard from '../../atoms/AppCard';

interface UserChatItemProps {
  chat: Chat;
  style?: ViewStyle;
}

const UserChatItem: FC<UserChatItemProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <AppCard style={styles.messageContainer}>
      <Text style={styles.message}>{props.chat.content}</Text>
    </AppCard>
    <Text style={styles.timestamp}>{format(props.chat.timestamp, 'hh:mm a')}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  messageContainer: {
    maxWidth: '70%',
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

export default UserChatItem;