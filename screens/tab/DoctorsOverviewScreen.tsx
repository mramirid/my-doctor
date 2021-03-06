import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import DoctorCategoryItem from '../../components/molecules/DoctorCategoryItem';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import TopRatedDoctorItem from '../../components/molecules/TopRatedDoctorItem';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import { topRatedDoctors } from '../../constants/dummies/doctors';
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
        <HomeProfile onPress={() => navigation.navigate('UserProfileScreen')} />
        <Text style={styles.welcomeText}>Mau konsultasi dengan siapa hari ini?</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoriesContent}
          showsHorizontalScrollIndicator={false}>
          <AppGap width={16} />
          {doctorCategories.map((category) => (
            <DoctorCategoryItem
              key={category.id}
              category={category.name}
              onPress={() => {
                navigation.navigate('CategoryDoctorsScreen', { category: category.name });
              }}
            />
          ))}
          <AppGap width={6} />
        </ScrollView>
      </View>
      <AppGap height={30} />
      <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
      <View style={styles.padX16}>
        {topRatedDoctors.map((doctor) => (
          <TopRatedDoctorItem
            key={doctor.id}
            style={styles.topRatedDoctor}
            doctor={doctor}
            onPress={() => navigation.navigate('DoctorProfileScreen', { doctor })}
          />
        ))}
      </View>
      <AppGap height={30} />
      <Text style={styles.sectionLabel}>Good News</Text>
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
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
  },
  topRatedDoctor: {
    marginTop: 16,
  },
  newsItem: {
    marginTop: 16,
  },
});

export default withStatusBar(DoctorsOverviewScreen, 'dark', Colors.White);
