import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import ChatInput from '../components/molecules/chat/ChatInput';
import PartnerChatItem from '../components/molecules/chat/PartnerChatItem';
import UserChatItem from '../components/molecules/chat/UserChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { Chat, ChatType, FireAllChat, FireChat, FireChatHistory } from '../global-types/chatting';
import { ChatRoomScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';
import useMounted from '../hooks/useMounted';
import { selectUserAuth } from '../store/reducers/auth';
import { useAppSelector } from '../store/types';

interface ChatsByDay {
  title: string;
  data: Chat[];
}

const ChatRoomScreen: FC = () => {
  const { params } = useRoute<ChatRoomScreenRouteProp>();
  const { runInMounted } = useMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const [sendLoading, setSendLoading] = useState(false);
  const [chatsByDay, setChatsByDay] = useState<ChatsByDay[] | null>(null);
  const { current: chatRoomId } = useRef(
    userAuth.isDoctor
      ? `${params.partner.uid}_${userAuth.uid!}`
      : `${userAuth.uid!}_${params.partner.uid}`
  );

  const onAllChatReceived = useCallback((data) => {
    const fireAllChat: FireAllChat | null = data.val();
    let chatsByDay: ChatsByDay[] | null = null;
    if (fireAllChat) {
      chatsByDay = Object.keys(fireAllChat)
        .map((dayDate) => ({
          title: dayDate,
          data: Object.keys(fireAllChat[dayDate])
            .map((chatId) => ({
              id: chatId,
              ...fireAllChat[dayDate][chatId],
            }))
            .reverse(),
        }))
        .reverse();
    }
    setChatsByDay(chatsByDay);
  }, []);

  useEffect(() => {
    const roomChatRef = firebase.database().ref(`chats/${chatRoomId}/allChat`);
    roomChatRef.on('value', onAllChatReceived);
    return () => roomChatRef.off('value', onAllChatReceived);
  }, [chatRoomId, onAllChatReceived]);

  const sendChat = async (chatContent: string) => {
    const createdChat: FireChat = {
      senderUid: userAuth.uid!,
      timestamp: new Date().getTime(),
      type: ChatType.Text,
      content: chatContent,
    };
    const userChatHistory: FireChatHistory = {
      lastChatContent: createdChat.content,
      lastChatTimestamp: createdChat.timestamp,
      partnerUid: params.partner.uid,
    };
    const doctorChatHistory: FireChatHistory = {
      lastChatContent: createdChat.content,
      lastChatTimestamp: createdChat.timestamp,
      partnerUid: userAuth.uid!,
    };
    try {
      setSendLoading(true);
      await Promise.all([
        firebase
          .database()
          .ref(`chats/${chatRoomId}/allChat/${format(createdChat.timestamp, 'yyyy-MM-dd')}`)
          .push(createdChat),
        firebase.database().ref(`messages/${userAuth.uid}/${chatRoomId}`).set(userChatHistory),
        firebase
          .database()
          .ref(`messages/${params.partner.uid}/${chatRoomId}`)
          .set(doctorChatHistory),
      ]);
    } catch (error) {
      showMessage({ message: 'Tidak dapat mengirim pesan, coba lagi nanti', type: 'danger' });
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
          sections={chatsByDay ?? []}
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
};

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
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
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
    maxWidth: '80%',
  },
});

export default withStatusBar(ChatRoomScreen, 'light', Colors.Dark);
