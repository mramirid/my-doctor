import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

import AppGap from '../components/atoms/AppGap';
import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import Colors from '../constants/colors';
import doctors from '../constants/dummies/doctors';
import Fonts from '../constants/fonts';
import {
  CategoryDoctorsScreenNavProp,
  CategoryDoctorsScreenRouteProp,
} from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const CategoryDoctorsScreen: React.FC = () => {
  const navigation = useNavigation<CategoryDoctorsScreenNavProp>();
  const { params } = useRoute<CategoryDoctorsScreenRouteProp>();
  const filteredDoctors = doctors.filter((doctor) => doctor.specialist === params.category);

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
            title={item.name}
            description={item.gender}
            avatar={<Image style={styles.avatar} source={{ uri: item.photoUrl }} />}
            withArrowIcon
            onPress={() => navigation.navigate('ChatRoomScreen', { doctor: item })}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={`Pilih ${params.category}`} type="dark" withBorderRadius />
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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
});

export default withStatusBar(CategoryDoctorsScreen, 'light', Colors.Dark);
