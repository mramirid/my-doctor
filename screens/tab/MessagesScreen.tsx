import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, Image, FlatList } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import ListItemBordered from '../../components/molecules/ListItemBordered';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { ChatHistory, FireChatHistories } from '../../global-types/chatting';
import { MessagesScreenNavProp } from '../../global-types/navigation';
import { Doctor, FireDoctor, FirePatient, Patient } from '../../global-types/user';
import withStatusBar from '../../hoc/withStatusBar';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';

const MessagesScreen: FC = () => {
  const navigation = useNavigation<MessagesScreenNavProp>();

  const userAuth = useAppSelector(selectUserAuth);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);

  const onChatHistoriesReceived = useCallback(async (data: firebase.database.DataSnapshot) => {
    const fireChatHistories: FireChatHistories | null = data.val();
    let chatHistories: ChatHistory[] = [];
    if (fireChatHistories) {
      chatHistories = await Promise.all(
        Object.keys(fireChatHistories).map<Promise<ChatHistory>>(async (chatRoomId) => {
          const data = await firebase
            .database()
            .ref(`users/${fireChatHistories[chatRoomId].partnerUid}`)
            .once('value');
          const fireUser: FirePatient | FireDoctor = data.val();
          const partner: Patient | Doctor = {
            uid: fireChatHistories[chatRoomId].partnerUid,
            ...fireUser,
          };
          return {
            chatId: chatRoomId,
            lastChatContent: fireChatHistories[chatRoomId].lastChatContent,
            lastChatTimestamp: fireChatHistories[chatRoomId].lastChatTimestamp,
            partner,
          };
        })
      );
    }
    setChatHistories(chatHistories);
  }, []);

  useEffect(() => {
    const userMessagesRef = firebase.database().ref(`messages/${userAuth.uid}`);
    userMessagesRef.on('value', onChatHistoriesReceived);
    return () => userMessagesRef.off('value', onChatHistoriesReceived);
  }, [onChatHistoriesReceived, userAuth.uid]);

  return (
    <AppTabScreen style={styles.screen}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        style={styles.list}
        data={chatHistories}
        keyExtractor={(item) => item.chatId}
        ListEmptyComponent={<Text style={styles.textEmpty}>Mulailah berkonsultasi</Text>}
        renderItem={({ item }) => (
          <ListItemBordered
            style={styles.messageItem}
            title={item.partner.fullName}
            avatar={
              <Image
                style={styles.avatar}
                source={
                  item.partner.photo
                    ? { uri: item.partner.photo }
                    : require('../../assets/illustrations/user-photo-null.png')
                }
              />
            }
            description={item.lastChatContent}
            onPress={() => navigation.navigate('ChatRoomScreen', { partner: item.partner })}
          />
        )}
      />
    </AppTabScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  list: {
    flex: 1,
  },
  textEmpty: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  messageItem: {
    marginTop: 16,
  },
});

export default withStatusBar(MessagesScreen, 'dark', Colors.White);
