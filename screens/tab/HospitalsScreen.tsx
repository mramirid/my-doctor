import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View, FlatList } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import HospitalItem from '../../components/molecules/HospitalItem';
import Colors from '../../constants/colors';
import hospitals from '../../constants/dummies/hospitals';
import Fonts from '../../constants/fonts';

const HospitalsScreen: React.FC = () => (
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
        data={hospitals}
        renderItem={({ item }) => <HospitalItem hospital={item} />}
      />
    </View>
    <StatusBar backgroundColor="transparent" />
  </AppTabScreen>
);

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
