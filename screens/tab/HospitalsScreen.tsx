import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import HospitalItem from '../../components/molecules/HospitalItem';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Hospital, { FireHospitals } from '../../global-types/hospital';

interface FireGetHospitals {
  [id: string]: FireHospitals;
}

async function fetchHospitals() {
  const data = await firebase.database().ref('hospitals').once('value');
  const fetchedHospitals: FireGetHospitals = data.val();
  const hospitals = Object.keys(fetchedHospitals).map<Hospital>((key) => ({
    id: key,
    ...fetchedHospitals[key],
  }));
  return hospitals;
}

const HospitalsScreen: FC = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const startFetchHospitals = useCallback(async () => {
    try {
      setFetchLoading(true);
      setHospitals(await fetchHospitals());
    } catch (error) {
      showMessage({
        message: error.message || 'Gagal memuat rumah sakit terdekat',
        type: 'danger',
      });
    } finally {
      setFetchLoading(false);
    }
  }, []);

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
          renderItem={({ item }) => <HospitalItem hospital={item} onPress={() => null} />}
        />
      </View>
      <StatusBar backgroundColor="transparent" />
    </AppTabScreen>
  );
};

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
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.White,
    textAlign: 'center',
  },
  total: {
    fontSize: 14,
    fontFamily: Fonts.NunitoLight,
    color: Colors.White,
    marginTop: 6,
    textAlign: 'center',
  },
  listHospitals: {
    marginTop: 14,
    paddingBottom: 30,
  },
});

export default HospitalsScreen;
