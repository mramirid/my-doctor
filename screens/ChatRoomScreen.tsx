import { useRoute } from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ChatInput from '../components/molecules/chat/ChatInput';
import ChatItem from '../components/molecules/chat/ChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import Colors from '../constants/colors';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const ChatRoomScreen: React.FC = () => {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  return (
    <>
      <ProfileHeader doctor={params.doctor} />
      <View style={styles.screen}>
        <View style={styles.chats}>
          <Text>Jum'at, 5 Maret, 2020</Text>
          <ChatItem text="Ibu dokter, apakah memakan jeruk tiap hari itu buruk?" />
          <ChatItem text="Oh tentu saja tidak karena jeruk itu sangat sehat..." />
          <ChatItem text="Baik ibu, terima kasih atas waktu dan ilmunya ..." />
        </View>
        <ChatInput doctor={params.doctor} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  chats: {
    flex: 1,
  },
});

export default withStatusBar(ChatRoomScreen, 'light', Colors.Dark);
