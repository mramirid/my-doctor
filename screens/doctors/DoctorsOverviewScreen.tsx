import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DoctorsCategory from '../../components/molecules/DoctorsCategory';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import RatedDoctor from '../../components/molecules/RatedDoctor';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const DoctorsOverviewScreenScreen: React.FC = () => (
  <View style={styles.screen}>
    <HomeProfile />
    <Text style={styles.welcomeText}>Mau konsultasi dengan siapa hari ini?</Text>
    <DoctorsCategory />
    <DoctorsCategory />
    <DoctorsCategory />
    <DoctorsCategory />
    <Text>Top Rated Doctors</Text>
    <RatedDoctor />
    <RatedDoctor />
    <RatedDoctor />
    <Text>Good News</Text>
    <NewsItem />
    <NewsItem />
    <NewsItem />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  welcomeText: {
    maxWidth: 209,
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark1,
    marginTop: 30,
    marginBottom: 16,
  },
});

export default DoctorsOverviewScreenScreen;
