import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import HospitalItem from '../../components/molecules/HospitalItem';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Hospital from '../../global-types/hospital';

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'Citra Bunga Merdeka',
    type: 'Rumah Sakit',
    address: 'Jln. Surya Sejahtera 20',
    imageUrl: 'https://i.ibb.co/gjmp2js/hospital-citra-bunga.png',
  },
  {
    id: '2',
    name: 'Happy Family Kids',
    type: 'Rumah Sakit Anak',
    address: 'Jln. Surya Sejahtera 21',
    imageUrl: 'https://i.ibb.co/8NZwTfG/hospital-happy-family.png',
  },
  {
    id: '3',
    name: 'Tingkatan Paling Atas',
    type: 'Rumah Sakit Jiwa',
    address: 'Jln. Surya Sejahtera 22',
    imageUrl: 'https://i.ibb.co/8DZrnjV/hospital-sakit-jiwa.png',
  },
];

const HospitalsScreen: React.FC = () => (
  <AppTabScreen>
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
        data={hospitals}
        renderItem={({ item }) => <HospitalItem hospital={item} />}
      />
    </View>
  </AppTabScreen>
);

const styles = StyleSheet.create({
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
