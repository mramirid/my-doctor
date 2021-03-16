import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React, { FC, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import ChatInput from '../components/molecules/chat/ChatInput';
import PartnerChatItem from '../components/molecules/chat/PartnerChatItem';
import UserChatItem from '../components/molecules/chat/UserChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import Colors from '../constants/colors';
import dummyChats from '../constants/dummies/chats';
import Fonts from '../constants/fonts';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';
import { selectUserAuth } from '../store/reducers/auth';
import { useAppSelector } from '../store/types';

enum ChatType {
  Text,
  Image,
}

interface Chat {
  senderUid: string;
  timestamp: number;
  type: ChatType;
  content: string;
}

const ChatRoomScreen: FC = () => {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  const userId = 'A';

  const userAuth = useAppSelector(selectUserAuth);

  const sendChat = useCallback(
    (chatContent) => {
      const chat: Chat = {
        senderUid: userAuth.uid!,
        timestamp: new Date().getTime(),
        type: ChatType.Text,
        content: chatContent,
      };
    },
    [userAuth.uid]
  );

  return (
    <>
      <ProfileHeader doctor={params.doctor} />
      <View style={styles.screen}>
        <Text style={styles.dateText}>{format(new Date(), 'PPPP', { locale: id })}</Text>
        <FlatList
          data={dummyChats}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item.sender.id === userId) {
              return <UserChatItem style={styles.chatItem} chat={item} />;
            } else {
              return <PartnerChatItem style={styles.chatItem} chat={item} />;
            }
          }}
        />
        <ChatInput partnerName={params.doctor.fullName} onSend={sendChat} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
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
