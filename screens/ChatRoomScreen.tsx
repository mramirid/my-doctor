import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import ChatInput from '../components/molecules/chat/ChatInput';
import PartnerChatItem from '../components/molecules/chat/PartnerChatItem';
import UserChatItem from '../components/molecules/chat/UserChatItem';
import ProfileHeader from '../components/molecules/header/ProfileHeader';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { Chat, ChatType, FireAllChat, FireChat, ChatHistory } from '../global-types/chatting';
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
  const { current: chatRoomId } = useRef(`${userAuth.uid!}_${params.doctor.uid}`);

  useEffect(() => {
    firebase
      .database()
      .ref(`chats/${chatRoomId}/allChat`)
      .on('value', (data) => {
        runInMounted(() => {
          const fireAllChat: FireAllChat | null = data.val();
          let chatsByDay: ChatsByDay[] | null = null;
          if (fireAllChat) {
            chatsByDay = Object.keys(fireAllChat).map((dayDate) => ({
              title: dayDate,
              data: Object.keys(fireAllChat[dayDate]).map((chatId) => ({
                id: chatId,
                ...fireAllChat[dayDate][chatId],
              })),
            }));
          }
          setChatsByDay(chatsByDay);
        });
      });
  }, [chatRoomId, runInMounted]);

  const sendChat = async (chatContent: string) => {
    const createdChat: FireChat = {
      senderUid: userAuth.uid!,
      timestamp: new Date().getTime(),
      type: ChatType.Text,
      content: chatContent,
    };
    const userChatHistory: ChatHistory = {
      lastChatContent: createdChat.content,
      lastChatTimestamp: createdChat.timestamp,
      partnerUid: params.doctor.uid,
    };
    const doctorChatHistory: ChatHistory = {
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
          .ref(`messages/${params.doctor.uid}/${chatRoomId}`)
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
      <ProfileHeader doctor={params.doctor} />
      <View style={styles.screen}>
        <SectionList
          sections={chatsByDay ?? []}
          ListEmptyComponent={<Text style={styles.textEmpty}>Mulai chat sekarang</Text>}
          renderSectionHeader={({ section }) => (
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
                  photo={isUserChat ? userAuth.photo : params.doctor.photo}
                  chat={item}
                />
              );
            }
          }}
        />
        <ChatInput partnerName={params.doctor.fullName} disabled={sendLoading} onSend={sendChat} />
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
  textEmpty: {
    textAlign: 'center',
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
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
