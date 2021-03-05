import { useRoute } from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import AppGap from '../components/atoms/AppGap';
import ChatInput from '../components/molecules/ChatInput';
import ChatItem from '../components/molecules/ChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import Colors from '../constants/colors';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const ChatRoomScreen: React.FC = () => {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  return (
    <View style={styles.screen}>
      <ProfileHeader doctor={params.doctor} />
      <AppGap height={20} />
      <Text>Jum'at, 5 Maret, 2020</Text>
      <ChatItem text="Ibu dokter, apakah memakan jeruk tiap hari itu buruk?" />
      <ChatItem text="Oh tentu saja tidak karena jeruk itu sangat sehat..." />
      <ChatItem text="Baik ibu, terima kasih atas waktu dan ilmunya ..." />
      <ChatInput doctor={params.doctor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default withStatusBar(ChatRoomScreen, 'light', Colors.Dark);
