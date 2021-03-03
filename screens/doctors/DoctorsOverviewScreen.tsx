import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import AppGap from '../../components/atoms/AppGap';
import DoctorsCategory from '../../components/molecules/DoctorsCategory';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import RatedDoctor from '../../components/molecules/RatedDoctor';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const DoctorsOverviewScreenScreen: React.FC = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <HomeProfile />
    <Text style={styles.welcomeText}>Mau konsultasi dengan siapa hari ini?</Text>
    <View>
      <ScrollView
        horizontal
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categories}
        showsHorizontalScrollIndicator={false}>
        <AppGap width={16} />
        <DoctorsCategory />
        <DoctorsCategory />
        <DoctorsCategory />
        <DoctorsCategory />
        <AppGap width={6} />
      </ScrollView>
    </View>
    <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
    <RatedDoctor />
    <RatedDoctor />
    <RatedDoctor />
    <Text style={styles.sectionLabel}>Good News</Text>
    <NewsItem />
    <NewsItem />
    <NewsItem />
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Dark1,
  },
  screenContent: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    maxWidth: 209,
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark1,
    marginTop: 30,
    marginBottom: 16,
  },
  categoriesContainer: {
    marginHorizontal: -16,
  },
  categories: {
    flexDirection: 'row',
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark1,
    marginTop: 30,
    marginBottom: 16,
  },
});

export default DoctorsOverviewScreenScreen;
