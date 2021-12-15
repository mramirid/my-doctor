import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import HospitalItem from '../../components/molecules/HospitalItem';
import fireApp from '../../config/firebase';
import Colors from '../../constants/colors';
import useMounted from '../../hooks/useMounted';
import { Hospital, HospitalData } from '../../types/hospital';

type Hospitals = Readonly<{
  [id: string]: HospitalData;
}>;

async function fetchHospitals() {
  const data = await fireApp.database().ref('hospitals').once('value');
  const fetchedHospitals: Hospitals | null = data.val();
  if (!fetchedHospitals) return [];
  const hospitals = Object.keys(fetchedHospitals).map<Hospital>((key) => ({
    id: key,
    ...fetchedHospitals[key],
  }));
  return hospitals;
}

export default function HospitalsScreen() {
  const { runInMounted } = useMounted();

  const [fetchLoading, setFetchLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const startFetchHospitals = useCallback(async () => {
    try {
      setFetchLoading(true);
      const hospitals = await fetchHospitals();
      runInMounted(() => setHospitals(hospitals));
    } catch (error: any) {
      showMessage({
        message: error.message ?? 'Gagal memuat rumah sakit terdekat',
        type: 'danger',
        statusBarHeight: Constants.statusBarHeight,
      });
    } finally {
      runInMounted(() => setFetchLoading(false));
    }
  }, [runInMounted]);

  useEffect(() => {
    startFetchHospitals();
  }, [startFetchHospitals]);

  return (
    <AppTabScreen style={styles.screen}>
      <ImageBackground
        style={styles.coverImage}
        source={require('../../assets/illustrations/hospitals-screen-cover.png')}>
        <Text style={styles.title}>Rumah Sakit Terdekat</Text>
        <Text style={styles.total}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={styles.listHospitals}
          showsVerticalScrollIndicator={false}
          refreshing={fetchLoading}
          onRefresh={startFetchHospitals}
          data={hospitals}
          ListEmptyComponent={<Text style={styles.textEmpty}>Belum ada rumah sakit terdekat</Text>}
          renderItem={({ item }) => <HospitalItem hospital={item} onPress={() => null} />}
        />
      </View>
      <StatusBar backgroundColor="transparent" />
    </AppTabScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 240,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    marginTop: -30,
    borderRadius: 20,
    backgroundColor: Colors.White,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.White,
    textAlign: 'center',
  },
  total: {
    fontSize: 14,
    fontFamily: 'Nunito_300Light',
    color: Colors.White,
    marginTop: 6,
    textAlign: 'center',
  },
  listHospitals: {
    marginTop: 14,
    paddingBottom: 30,
  },
  textEmpty: {
    marginTop: 14,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    color: Colors.Dark,
  },
});
