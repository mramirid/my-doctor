import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import AppGap from '../components/atoms/AppGap';
import AppHeader from '../components/molecules/AppHeader';
import DoctorItem from '../components/molecules/DoctorItem';
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
          <DoctorItem
            doctor={item}
            description={item.gender}
            withArrowIcon
            onPress={() => {
              navigation.navigate('ChatRoomScreen', { doctor: item });
            }}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={`Pilih ${params.category}`} type="dark" withBorderRadius />
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
});

export default withStatusBar(CategoryDoctorsScreen, 'light', Colors.Dark);
