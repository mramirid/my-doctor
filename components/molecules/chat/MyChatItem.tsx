import { format } from 'date-fns';
import React, { FC } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Chat from '../../../global-types/chat';
import AppCard from '../../atoms/AppCard';

interface MyChatItemProps {
  chat: Chat;
  style?: ViewStyle;
}

const MyChatItem: FC<MyChatItemProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <AppCard style={styles.messageContainer}>
      <Text style={styles.message}>{props.chat.message}</Text>
    </AppCard>
    <Text style={styles.date}>{format(props.chat.date, 'hh:mm a')}</Text>
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
  date: {
    fontSize: 11,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 8,
  },
});

export default MyChatItem;
