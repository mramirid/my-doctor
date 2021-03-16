import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppGap from '../components/atoms/AppGap';
import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import DoctorSpecialist from '../constants/doctor-specialist';
import Fonts from '../constants/fonts';
import {
  CategoryDoctorsScreenNavProp,
  CategoryDoctorsScreenRouteProp,
} from '../global-types/navigation';
import { Doctor, FireGetDoctors } from '../global-types/user';
import withStatusBar from '../hoc/withStatusBar';

async function fetchDoctorsByCategory(specialist: DoctorSpecialist) {
  const data = await firebase
    .database()
    .ref('users')
    .orderByChild('occupation')
    .equalTo(specialist)
    .once('value');

  const fetchedTopDoctors: FireGetDoctors | null = data.val();
  if (!fetchedTopDoctors) return [];

  const topDoctors = Object.keys(fetchedTopDoctors).map<Doctor>((key) => ({
    uid: key,
    ...fetchedTopDoctors[key],
  }));
  return topDoctors;
}

const CategoryDoctorsScreen: FC = () => {
  const navigation = useNavigation<CategoryDoctorsScreenNavProp>();
  const { params } = useRoute<CategoryDoctorsScreenRouteProp>();

  const [fetchLoading, setFetchLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const startFetchHospitals = useCallback(async () => {
    try {
      setFetchLoading(true);
      setDoctors(await fetchDoctorsByCategory(params.category.name));
    } catch (error) {
      showMessage({
        message: error.message || 'Gagal memuat rumah sakit terdekat',
        type: 'danger',
      });
    } finally {
      setFetchLoading(false);
    }
  }, [params.category.name]);

  useEffect(() => {
    startFetchHospitals();
  }, [startFetchHospitals]);

  return (
    <View style={styles.screen}>
      <Header
        title={`Pilih ${params.category.name}`}
        type="dark"
        withBorderRadius
        onBackButtonPressed={navigation.goBack}
      />
      <AppGap height={20} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={doctors}
        keyExtractor={(doctor) => doctor.uid}
        refreshing={fetchLoading}
        onRefresh={startFetchHospitals}
        ListEmptyComponent={<Text style={styles.textEmpty}>Belum ada dokter di kategori ini</Text>}
        renderItem={({ item }) => (
          <ListItemBordered
            style={styles.doctorItem}
            title={item.fullName}
            description={item.gender}
            avatar={
              <Image
                style={styles.avatar}
                source={
                  item.photo
                    ? { uri: item.photo }
                    : require('../assets/illustrations/user-photo-null.png')
                }
              />
            }
            withArrowIcon
            onPress={() => navigation.navigate('DoctorDetailScreen', { doctor: item })}
          />
        )}
      />
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
