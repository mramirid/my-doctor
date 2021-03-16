import { useNavigation } from '@react-navigation/core';
import React, { FC } from 'react';
import { StyleSheet, Text, Image, FlatList } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import ListItemBordered from '../../components/molecules/ListItemBordered';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { MessagesScreenNavProp } from '../../global-types/navigation';
import { Doctor } from '../../global-types/user';
import withStatusBar from '../../hoc/withStatusBar';

const pedriaticians: Doctor[] = [];

const MessagesScreen: FC = () => {
  const navigation = useNavigation<MessagesScreenNavProp>();
  return (
    <AppTabScreen style={styles.screen}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={pedriaticians}
        style={styles.list}
        renderItem={({ item }) => (
          <ListItemBordered
            style={styles.messageItem}
            key={item.uid}
            title={item.fullName}
            avatar={
              <Image
                style={styles.avatar}
                source={
                  item.photo
                    ? { uri: item.photo }
                    : require('../../assets/illustrations/user-photo-null.png')
                }
              />
            }
            description="Baik ibu, terima kasih banyak atas wakt..."
            onPress={() => navigation.navigate('ChatRoomScreen', { doctor: item })}
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
  messageItem: {
    marginTop: 16,
  },
});

export default withStatusBar(MessagesScreen, 'dark', Colors.White);
