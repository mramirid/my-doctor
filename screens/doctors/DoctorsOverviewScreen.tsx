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
  <View style={styles.screen}>
    <ScrollView
      style={styles.screenScrollView}
      contentContainerStyle={styles.screenScrollViewContent}
      showsHorizontalScrollIndicator={false}>
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
      <RatedDoctor style={styles.ratedDoctor} />
      <RatedDoctor style={styles.ratedDoctor} />
      <RatedDoctor style={styles.ratedDoctor} />
      <Text style={styles.sectionLabel}>Good News</Text>
      <NewsItem />
      <NewsItem />
      <NewsItem />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Dark,
  },
  screenScrollView: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  screenScrollViewContent: {
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  welcomeText: {
    maxWidth: 209,
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
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
    color: Colors.Dark,
    marginTop: 30,
    marginBottom: 16,
  },
  ratedDoctor: {
    marginBottom: 16,
  },
});

export default DoctorsOverviewScreenScreen;
