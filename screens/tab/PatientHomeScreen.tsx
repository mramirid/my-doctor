import { useNavigation } from '@react-navigation/native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import DoctorCategoryItem from '../../components/molecules/DoctorCategoryItem';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import TopRatedDoctorItem from '../../components/molecules/TopRatedDoctorItem';
import firebase from '../../config/firebase';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import Fonts from '../../constants/fonts';
import { AppLoadingIndicatorContext } from '../../contexts/app-loading-indicator';
import { PatientHomeScreenNavProp } from '../../global-types/navigation';
import { FireNews, News } from '../../global-types/news';
import { Doctor, DoctorCategory as IDoctorCategory, FireDoctor } from '../../global-types/user';
import withStatusBar from '../../hoc/withStatusBar';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';

interface FireGetNews {
  [id: string]: FireNews;
}

async function fetchNews() {
  const data = await firebase.database().ref('news').once('value');
  const fetchedNews: FireGetNews = data.val();
  const news = Object.keys(fetchedNews).map<News>((key) => ({ id: key, ...fetchedNews[key] }));
  return news;
}

interface FireGetDoctorCategories {
  [id: string]: DoctorSpecialist;
}

async function fetchDoctorCategories() {
  const data = await firebase.database().ref('doctorCategories').once('value');
  const fetchedCategories: FireGetDoctorCategories = data.val();
  const categories = Object.keys(fetchedCategories).map<IDoctorCategory>((key) => ({
    id: key,
    name: fetchedCategories[key],
  }));
  return categories;
}

interface FireGetDoctors {
  [id: string]: FireDoctor;
}

async function fetchTopRatedDoctors() {
  const data = await firebase
    .database()
    .ref('users')
    .orderByChild('rating')
    .limitToLast(3)
    .once('value');
  const fetchedTopDoctors: FireGetDoctors = data.val();
  const topDoctors = Object.keys(fetchedTopDoctors).map<Doctor>((key) => ({
    uid: key,
    ...fetchedTopDoctors[key],
  }));
  return topDoctors;
}

const PatientHomeScreen: FC = () => {
  const navigation = useNavigation<PatientHomeScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const [doctorCategories, setDoctorCategories] = useState<IDoctorCategory[]>([]);
  const [topRatedDoctors, setTopRatedDoctors] = useState<Doctor[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    (async () => {
      try {
        showScreenLoading();
        const [news, doctorCategories, topRatedDoctors] = await Promise.all([
          fetchNews(),
          fetchDoctorCategories(),
          fetchTopRatedDoctors(),
        ]);
        setDoctorCategories(doctorCategories);
        setTopRatedDoctors(topRatedDoctors);
        setNews(news);
      } catch (error) {
        showMessage({
          message: error.message || 'Gagal menjangkau server',
          type: 'danger',
        });
      } finally {
        hideScreenLoading();
      }
    })();
  }, [hideScreenLoading, showScreenLoading]);

  return (
    <AppTabScreen style={styles.screen} withScrollView>
      <View style={styles.padX16}>
        <HomeProfile
          fullName={userAuth.fullName!}
          occupation={userAuth.occupation!}
          photo={userAuth.photo}
          onPress={() => navigation.navigate('UserProfileScreen')}
        />
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
            key={doctor.uid}
            style={styles.topRatedDoctor}
            doctor={doctor}
            onPress={() => navigation.navigate('DoctorDetailScreen', { doctor })}
          />
        ))}
      </View>
      <AppGap height={30} />
      <Text style={styles.sectionLabel}>Good News</Text>
      {news.map((item) => (
        <NewsItem style={styles.newsItem} key={item.id} news={item} onPress={() => null} />
      ))}
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

export default withStatusBar(PatientHomeScreen, 'dark', Colors.White);
