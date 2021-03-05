import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

import AppHeader from '../../components/molecules/AppHeader';
import DoctorItem from '../../components/molecules/DoctorItem';
import Colors from '../../constants/colors';
import doctors from '../../constants/dummies/doctors';
import Fonts from '../../constants/fonts';
import { ListDoctorsScreenRouteProp } from '../../global-types/navigation';
import withStatusBar from '../../hoc/withStatusBar';

const ListDoctorsScreen: React.FC = () => {
  // const navigation = useNavigation<ListDoctorsScreenNavProp>();
  const { params } = useRoute<ListDoctorsScreenRouteProp>();
  const filteredDoctors = doctors.filter((doctor) => doctor.specialist === params.category);

  let body: JSX.Element;
  if (filteredDoctors.length === 0) {
    body = (
      <View style={styles.screenEmpty}>
        <Text style={styles.textEmpty}>Belum ada dokter di kategori ini</Text>
      </View>
    );
  } else {
    body = (
      <FlatList
        data={filteredDoctors}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <DoctorItem doctor={item} description={item.gender} onPress={() => null} />
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={`Pilih ${params.category}`} type="dark" withBorderRadius />
      {body}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenEmpty: {
    alignItems: 'center',
    marginTop: 16,
  },
  textEmpty: {
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  listContent: {
    flex: 1,
  },
});

export default withStatusBar(ListDoctorsScreen, 'light', Colors.Dark);
