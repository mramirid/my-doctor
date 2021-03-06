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
import dummyChats from '../constants/dummies/chats';
import Fonts from '../constants/fonts';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

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
            data={dummyChats}
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
