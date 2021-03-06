import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import ChatInput from '../components/molecules/chat/ChatInput';
import MyChatItem from '../components/molecules/chat/MyChatItem';
import OtherChatItem from '../components/molecules/chat/OtherChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import Chat from '../global-types/chat';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const chats: Chat[] = [
  {
    id: '1',
    message: 'Ibu dokter, apakah memakan jeruk tiap hari itu buruk?',
    date: new Date().getTime(),
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '2',
    message: 'Oh tentu saja tidak karena jeruk itu sangat sehat...',
    date: new Date().getTime() + 3600000,
    sender: {
      id: 'B',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '3',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    date: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '4',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    date: new Date().getTime() + 3600000,
    sender: {
      id: 'B',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '5',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    date: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
  {
    id: '6',
    message: 'Baik ibu, terima kasih atas waktu dan ilmunya...',
    date: new Date().getTime() + 3600000,
    sender: {
      id: 'A',
      photoUrl: 'https://i.ibb.co/9nqPWmN/doctor-nairobi-putri.png',
    },
  },
];

const ChatRoomScreen: React.FC = () => {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  const userId = 'A';

  return (
    <>
      <ProfileHeader doctor={params.doctor} />
      <View style={styles.screen}>
        <View style={styles.chats}>
          <Text style={styles.dateText}>{format(new Date(), 'PPPP', { locale: id })}</Text>
          <FlatList
            data={chats}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.sender.id === userId) {
                return <MyChatItem style={styles.chatItem} chat={item} />;
              } else {
                return <OtherChatItem style={styles.chatItem} chat={item} />;
              }
            }}
          />
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
  dateText: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Fonts.NunitoRegular,
    fontSize: 11,
    color: Colors.Grey2,
  },
  chatItem: {
    marginBottom: 20,
  },
});

export default withStatusBar(ChatRoomScreen, 'light', Colors.Dark);
