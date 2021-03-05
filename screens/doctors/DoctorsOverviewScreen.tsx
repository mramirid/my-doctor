import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import DoctorCategory from '../../components/molecules/DoctorCategory';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import RatedDoctor from '../../components/molecules/RatedDoctor';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import Fonts from '../../constants/fonts';
import { DoctorCategory as IDoctorCategory } from '../../global-types/doctor';
import { DoctorsOverviewScreenNavProp } from '../../global-types/navigation';
import withStatusBar from '../../hoc/withStatusBar';

const doctorCategories: IDoctorCategory[] = [
  {
    id: '1',
    name: DoctorSpecialist.GeneralPractitioner,
  },
  {
    id: '2',
    name: DoctorSpecialist.Psychiatrist,
  },
  {
    id: '3',
    name: DoctorSpecialist.Medicine,
  },
  {
    id: '4',
    name: DoctorSpecialist.Pediatrician,
  },
];

const DoctorsOverviewScreen: React.FC = () => {
  const navigation = useNavigation<DoctorsOverviewScreenNavProp>();
  return (
    <AppTabScreen style={styles.screen} withScrollView>
      <View style={styles.padX16}>
        <HomeProfile />
        <Text style={styles.welcomeText}>Mau konsultasi dengan siapa hari ini?</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoriesContent}
          showsHorizontalScrollIndicator={false}>
          <AppGap width={16} />
          {doctorCategories.map((category) => (
            <DoctorCategory
              key={category.id}
              category={category.name}
              onPress={() => {
                navigation.navigate('ListDoctorsScreen', { category: category.name });
              }}
            />
          ))}
          <AppGap width={6} />
        </ScrollView>
      </View>
      <View style={styles.padX16}>
        <AppGap height={30} />
        <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
        <RatedDoctor style={styles.ratedDoctor} />
        <RatedDoctor style={styles.ratedDoctor} />
        <RatedDoctor style={styles.ratedDoctor} />
        <AppGap height={14} />
        <Text style={styles.sectionLabel}>Good News</Text>
      </View>
      <NewsItem style={styles.newsItem} />
      <NewsItem style={styles.newsItem} />
      <NewsItem style={styles.newsItem} />
    </AppTabScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
  },
  padX16: {
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
  categoriesContent: {
    flexDirection: 'row',
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    marginBottom: 16,
  },
  ratedDoctor: {
    marginBottom: 16,
  },
  newsItem: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default withStatusBar(DoctorsOverviewScreen, 'dark', Colors.White);
