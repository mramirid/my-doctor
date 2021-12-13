import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { FlatList } from 'react-native-gesture-handler';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import DoctorCategoryItem from '../../components/molecules/DoctorCategoryItem';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import TopRatedDoctorItem from '../../components/molecules/TopRatedDoctorItem';
import firebase from '../../config/firebase';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { specialistOptions } from '../../constants/user';
import withStatusBar from '../../hoc/withStatusBar';
import useMounted from '../../hooks/useMounted';
import { AppStackParamList } from '../../navigation/AppStack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';
import { DBNews, News } from '../../types/news';
import { Doctor, Doctors } from '../../types/user';

type PatientHomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'PatientHomeScreen'>,
  StackNavigationProp<AppStackParamList>
>;

async function fetchNews() {
  const data = await firebase
    .database()
    .ref('news')
    .orderByChild('timestamp')
    .limitToLast(3)
    .once('value');
  const fetchedNews: DBNews | null = data.val();
  if (!fetchedNews) return [];
  const news = Object.keys(fetchedNews).map<News>((key) => ({ id: key, ...fetchedNews[key] }));
  return news;
}

async function fetchTopRatedDoctors() {
  const data = await firebase
    .database()
    .ref('users')
    .orderByChild('rating')
    .limitToLast(3)
    .once('value');

  const fetchedTopDoctors: Doctors | null = data.val();
  if (!fetchedTopDoctors) return [];

  const topDoctors = Object.keys(fetchedTopDoctors).map<Doctor>((key) => ({
    uid: key,
    ...fetchedTopDoctors[key],
  }));
  return topDoctors;
}

function PatientHomeScreen() {
  const navigation = useNavigation<PatientHomeScreenNavProp>();
  const { runInMounted } = useMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const [topRatedDoctors, setTopRatedDoctors] = useState({
    isFetching: true,
    data: [] as Doctor[],
  });
  const [news, setNews] = useState({
    isFetching: true,
    data: [] as News[],
  });

  useEffect(() => {
    (async () => {
      try {
        const [news, topRatedDoctors] = await Promise.all([fetchNews(), fetchTopRatedDoctors()]);
        runInMounted(() => {
          setTopRatedDoctors({ isFetching: false, data: topRatedDoctors });
          setNews({ isFetching: false, data: news });
        });
      } catch (error: any) {
        showMessage({
          message: error.message ?? 'Gagal menjangkau server',
          type: 'danger',
        });
      }
    })();
  }, [runInMounted]);

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
      <FlatList
        horizontal
        contentContainerStyle={styles.categoriesContent}
        showsHorizontalScrollIndicator={false}
        data={specialistOptions}
        renderItem={({ item, index }) => (
          <>
            <AppGap width={16} />
            <DoctorCategoryItem
              key={index}
              category={item.value}
              onPress={() => navigation.navigate('CategoryDoctorsScreen', { category: item })}
            />
            {index === specialistOptions.length - 1 && <AppGap width={16} />}
          </>
        )}
      />
      <AppGap height={30} />
      <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
      <View style={styles.padX16}>
        {topRatedDoctors.isFetching ? (
          <View style={styles.fetchLoadingContainer}>
            <ActivityIndicator size="large" color={Colors.Green3} />
          </View>
        ) : (
          topRatedDoctors.data.map((doctor) => {
            // BUG: it still displays patients
            return (
              <TopRatedDoctorItem
                key={doctor.uid}
                style={styles.topRatedDoctor}
                doctor={doctor}
                onPress={() => navigation.navigate('DoctorDetailScreen', { doctor })}
              />
            );
          })
        )}
      </View>
      <AppGap height={30} />
      <Text style={styles.sectionLabel}>Good News</Text>
      {news.isFetching ? (
        <View style={styles.fetchLoadingContainer}>
          <ActivityIndicator size="large" color={Colors.Green3} />
        </View>
      ) : (
        news.data.map((item) => (
          <NewsItem style={styles.newsItem} key={item.id} news={item} onPress={() => null} />
        ))
      )}
    </AppTabScreen>
  );
}

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
  fetchLoadingContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRatedDoctor: {
    marginTop: 16,
  },
  newsItem: {
    marginTop: 16,
  },
});

export default withStatusBar(PatientHomeScreen, 'dark', Colors.White);
