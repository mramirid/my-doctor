import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ReadonlyDeep } from 'type-fest';

import ChatInput from '../components/molecules/chat/ChatInput';
import PartnerChatItem from '../components/molecules/chat/PartnerChatItem';
import UserChatItem from '../components/molecules/chat/UserChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import fireApp from '../config/firebase';
import Colors from '../constants/colors';
import withStatusBar from '../hoc/withStatusBar';
import useMounted from '../hooks/useMounted';
import { AppStackParamList } from '../navigation/AppStack';
import { selectUserAuth } from '../store/reducers/auth';
import { useAppSelector } from '../store/types';
import { Chat, ChatData, ChatHistories, ChatType } from '../types/chat';

type ChatRoomScreenRouteProp = RouteProp<AppStackParamList, 'ChatRoomScreen'>;

type ChatsPerDays = ReadonlyDeep<{
  [dayDate: string]: {
    [chatId: string]: ChatData;
  };
}>;

type ChatPerDay = ReadonlyDeep<{
  title: string;
  data: Chat[];
}>;

function ChatRoomScreen() {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  const { runInMounted } = useMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const [sendLoading, setSendLoading] = useState(false);
  const [chats, setChats] = useState<ChatPerDay[] | null>(null);
  const { current: chatRoomId } = useRef(
    userAuth.isDoctor
      ? `${params.partner.uid}_${userAuth.uid!}`
      : `${userAuth.uid!}_${params.partner.uid}`
  );

  const onAllChatReceived = useCallback((data) => {
    const chatsPerDays: ChatsPerDays | null = data.val();
    let chats: ChatPerDay[] | null = null;
    if (chatsPerDays !== null) {
      chats = Object.keys(chatsPerDays)
        .map((dayDate) => ({
          title: dayDate,
          data: Object.keys(chatsPerDays[dayDate])
            .map((chatId) => ({ id: chatId, ...chatsPerDays[dayDate][chatId] }))
            .reverse(),
        }))
        .reverse();
    }
    setChats(chats);
  }, []);

  useEffect(() => {
    const roomChatRef = fireApp.database().ref(`chats/${chatRoomId}/allChat`);
    roomChatRef.on('value', onAllChatReceived);
    return () => roomChatRef.off('value', onAllChatReceived);
  }, [chatRoomId, onAllChatReceived]);

  const sendChat = async (chatContent: string) => {
    const createdChat: ChatData = {
      senderUid: userAuth.uid!,
      timestamp: new Date().getTime(),
      type: ChatType.Text,
      content: chatContent,
    };
    const userChatHistory: ChatHistories['chatId'] = {
      lastChatContent: createdChat.content,
      lastChatTimestamp: createdChat.timestamp,
      partnerUid: params.partner.uid,
    };
    const doctorChatHistory: ChatHistories['chatId'] = {
      lastChatContent: createdChat.content,
      lastChatTimestamp: createdChat.timestamp,
      partnerUid: userAuth.uid!,
    };
    try {
      setSendLoading(true);
      await Promise.all([
        fireApp
          .database()
          .ref(`chats/${chatRoomId}/allChat/${format(createdChat.timestamp, 'yyyy-MM-dd')}`)
          .push(createdChat),
        fireApp.database().ref(`messages/${userAuth.uid}/${chatRoomId}`).set(userChatHistory),
        fireApp
          .database()
          .ref(`messages/${params.partner.uid}/${chatRoomId}`)
          .set(doctorChatHistory),
      ]);
    } catch (error: any) {
      showMessage({
        message: 'Tidak dapat mengirim pesan, coba lagi nanti',
        type: 'danger',
        statusBarHeight: Constants.statusBarHeight,
      });
    } finally {
      runInMounted(() => setSendLoading(false));
    }
  };

  return (
    <>
      <ProfileHeader partner={params.partner} />
      <View style={styles.screen}>
        <SectionList
          inverted
          contentContainerStyle={styles.sectionListContent}
          showsVerticalScrollIndicator={false}
          sections={chats ?? []}
          ListEmptyComponent={<Text style={styles.textEmpty}>Mulai chat sekarang</Text>}
          renderSectionFooter={({ section }) => (
            <Text style={styles.dateText}>
              {format(new Date(section.title), 'PPPP', { locale: id })}
            </Text>
          )}
          renderItem={({ item }) => {
            const isUserChat = item.senderUid === userAuth.uid;
            if (isUserChat) {
              return <UserChatItem style={styles.chatItem} chat={item} />;
            } else {
              return (
                <PartnerChatItem
                  style={styles.chatItem}
                  photo={isUserChat ? userAuth.photo : params.partner.photo}
                  chat={item}
                />
              );
            }
          }}
        />
        <ChatInput partnerName={params.partner.fullName} disabled={sendLoading} onSend={sendChat} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionListContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  textEmpty: {
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    color: Colors.Dark,
  },
  dateText: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito_400Regular',
    fontSize: 11,
    color: Colors.Grey2,
  },
  chatItem: {
    marginBottom: 20,
    maxWidth: '80%',
  },
});

export default withStatusBar(ChatRoomScreen, 'light', Colors.Dark);
