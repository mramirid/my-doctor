import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import HospitalItem from '../../components/molecules/HospitalItem';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const HospitalsScreen: React.FC = () => (
  <AppTabScreen>
    <ImageBackground
      style={styles.coverImage}
      source={require('../../assets/illustrations/hospitals_screen_cover.png')}>
      <Text style={styles.title}>Nearby Hospitals</Text>
      <Text style={styles.total}>3 tersedia</Text>
    </ImageBackground>
    <View style={styles.content}>
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
      <HospitalItem />
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
    paddingTop: 14,
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
});

export default HospitalsScreen;
