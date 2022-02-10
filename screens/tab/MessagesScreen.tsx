import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import fireApp from 'firebase';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import ListItemBordered from '../../components/molecules/ListItemBordered';
import Colors from '../../constants/colors';
import withStatusBar from '../../hoc/withStatusBar';
import { AppStackParamList } from '../../navigation/AppStack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';
import { ChatHistories } from '../../types/chat';
import { Doctor, DoctorData, Patient, PatientData } from '../../types/user';

type MessagesScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'MessagesScreen'>,
  StackNavigationProp<AppStackParamList>
>;

type ChatHistory = Readonly<{
  chatId: string;
  lastChatContent: string;
  lastChatTimestamp: number;
  partner: Patient | Doctor;
}>;

function MessagesScreen() {
  const navigation = useNavigation<MessagesScreenNavProp>();

  const userAuth = useAppSelector(selectUserAuth);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);

  const onChatHistoriesReceived = useCallback(async (data: fireApp.database.DataSnapshot) => {
    const chatHistories: ChatHistories | null = data.val();
    let formattedChatHistories: ChatHistory[] = [];
    if (chatHistories !== null) {
      formattedChatHistories = await Promise.all(
        Object.entries(chatHistories).map<Promise<ChatHistory>>(
          async ([chatRoomId, chatHistory]) => {
            const data = await fireApp
              .database()
              .ref(`users/${chatHistory.partnerUid}`)
              .once('value');
            const fireUser: PatientData | DoctorData = data.val();
            const partner: Patient | Doctor = {
              uid: chatHistory.partnerUid,
              ...fireUser,
            };
            return {
              chatId: chatRoomId,
              lastChatContent: chatHistory.lastChatContent,
              lastChatTimestamp: chatHistory.lastChatTimestamp,
              partner,
            };
          }
        )
      );
    }
    setChatHistories(formattedChatHistories);
  }, []);

  useEffect(() => {
    const userMessagesRef = fireApp.database().ref(`messages/${userAuth.uid}`);
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
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
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
    fontFamily: 'Nunito_400Regular',
    color: Colors.Dark,
  },
  messageItem: {
    marginTop: 16,
  },
});

export default withStatusBar(MessagesScreen, 'dark', Colors.White);
