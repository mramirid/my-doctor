import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

import AppGap from '../components/atoms/AppGap';
import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import {
  CategoryDoctorsScreenNavProp,
  CategoryDoctorsScreenRouteProp,
} from '../global-types/navigation';
import { Doctor } from '../global-types/user';
import withStatusBar from '../hoc/withStatusBar';

const filteredDoctors: Doctor[] = [];

async function fetchDoctorsByCategory() {
  const data = await firebase.database().ref('news').once('value');
  const fetchedNews: FireGetNews = data.val();
  const news = Object.keys(fetchedNews).map<News>((key) => ({ id: key, ...fetchedNews[key] }));
  return news;
}

const CategoryDoctorsScreen: FC = () => {
  const navigation = useNavigation<CategoryDoctorsScreenNavProp>();
  const { params } = useRoute<CategoryDoctorsScreenRouteProp>();

  let bodyContent: JSX.Element;
  if (filteredDoctors.length === 0) {
    bodyContent = <Text style={styles.textEmpty}>Belum ada dokter di kategori ini</Text>;
  } else {
    bodyContent = (
      <FlatList
        data={filteredDoctors}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListItemBordered
            style={styles.doctorItem}
            title={item.fullName}
            description={item.gender}
            avatar={<Image style={styles.avatar} source={{ uri: item.photo! }} />}
            withArrowIcon
            onPress={() => navigation.navigate('ChatRoomScreen', { doctor: item })}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header
        title={`Pilih ${params.category}`}
        type="dark"
        withBorderRadius
        onBackButtonPressed={navigation.goBack}
      />
      <AppGap height={20} />
      {bodyContent}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textEmpty: {
    textAlign: 'center',
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  listContent: {
    flex: 1,
  },
  doctorItem: {
    marginTop: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
});

export default withStatusBar(CategoryDoctorsScreen, 'light', Colors.Dark);
