import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppGap from '../components/atoms/AppGap';
import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { DoctorSpecialist } from '../constants/user';
import withStatusBar from '../hoc/withStatusBar';
import useMounted from '../hooks/useMounted';
import { AppStackParamList } from '../navigation/AppStack';
import { Doctor, Doctors } from '../types/user';

type CategoryDoctorsScreenRouteProp = RouteProp<AppStackParamList, 'CategoryDoctorsScreen'>;
type CategoryDoctorsScreenNavProp = StackNavigationProp<AppStackParamList, 'CategoryDoctorsScreen'>;

async function fetchDoctorsByCategory(specialist: DoctorSpecialist | string) {
  const data = await firebase
    .database()
    .ref('users')
    .orderByChild('occupation')
    .equalTo(specialist)
    .once('value');

  const fetchedTopDoctors: Doctors | null = data.val();
  if (!fetchedTopDoctors) return [];

  const topDoctors = Object.keys(fetchedTopDoctors).map<Doctor>((key) => ({
    uid: key,
    ...fetchedTopDoctors[key],
  }));
  return topDoctors;
}

function CategoryDoctorsScreen() {
  const navigation = useNavigation<CategoryDoctorsScreenNavProp>();
  const { params } = useRoute<CategoryDoctorsScreenRouteProp>();
  const { runInMounted } = useMounted();

  const [fetchLoading, setFetchLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const startFetchHospitals = useCallback(async () => {
    try {
      setFetchLoading(true);
      const doctors = await fetchDoctorsByCategory(params.category);
      runInMounted(() => setDoctors(doctors));
    } catch (error: any) {
      showMessage({
        message: error.message ?? 'Gagal memuat rumah sakit terdekat',
        type: 'danger',
      });
    } finally {
      runInMounted(() => setFetchLoading(false));
    }
  }, [params.category, runInMounted]);

  useEffect(() => {
    startFetchHospitals();
  }, [startFetchHospitals]);

  return (
    <View style={styles.screen}>
      <Header
        title={`Pilih ${params.category}`}
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
}

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
