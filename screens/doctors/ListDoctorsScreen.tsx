import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import AppHeader from '../../components/molecules/AppHeader';
import DoctorItem from '../../components/molecules/DoctorItem';
import doctors from '../../constants/dummies/doctors';
import { ListDoctorsScreenRouteProp } from '../../global-types/navigation';

const ListDoctorsScreen: React.FC = () => {
  const { params } = useRoute<ListDoctorsScreenRouteProp>();

  const filteredDoctors = doctors.filter((doctor) => doctor.specialist === params.category);

  return (
    <View style={styles.screen}>
      <AppHeader title={`Pilih ${params.category}`} />
      <FlatList
        data={filteredDoctors}
        contentContainerStyle={{ flex: 1 }}
        renderItem={({ item }) => <DoctorItem doctor={item} extra={item.gender} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ListDoctorsScreen;
