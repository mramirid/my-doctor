import { format } from 'date-fns';
import React, { FC } from 'react';
import { View, StyleSheet, Text, ViewStyle, Image } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Chat from '../../../global-types/chat';
import AppCard from '../../atoms/AppCard';

interface OtherChatItemProps {
  chat: Chat;
  style?: ViewStyle;
}

const OtherChatItem: FC<OtherChatItemProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <Image style={styles.avatar} source={{ uri: props.chat.sender.photoUrl }} />
    <View>
      <AppCard style={styles.messageCard}>
        <Text style={styles.message}>{props.chat.message}</Text>
      </AppCard>
      <Text style={styles.date}>{format(props.chat.date, 'hh:mm a')}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  messageCard: {
    maxWidth: '80%',
    padding: 12,
    paddingLeft: 18,
    backgroundColor: Colors.Green2,
    borderBottomLeftRadius: 0,
  },
  message: {
    fontSize: 14,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.White,
  },
  date: {
    fontSize: 11,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 8,
  },
});

export default OtherChatItem;
