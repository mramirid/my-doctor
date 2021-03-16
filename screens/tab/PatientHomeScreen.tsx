import { useNavigation } from '@react-navigation/native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import { AppLoadingIndicatorContext } from '../../contexts/app-loading-indicator';
import { PatientHomeScreenNavProp } from '../../global-types/navigation';
import { FireNews, News } from '../../global-types/news';
import { Doctor, FireGetDoctors } from '../../global-types/user';
import withStatusBar from '../../hoc/withStatusBar';
import useMounted from '../../hooks/useMounted';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';

interface FireGetNews {
  [id: string]: FireNews;
}

async function fetchNews() {
  const data = await firebase
    .database()
    .ref('news')
    .orderByChild('date')
    .limitToLast(3)
    .once('value');
  const fetchedNews: FireGetNews | null = data.val();
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

  const fetchedTopDoctors: FireGetDoctors | null = data.val();
  if (!fetchedTopDoctors) return [];

  const topDoctors = Object.keys(fetchedTopDoctors).map<Doctor>((key) => ({
    uid: key,
    ...fetchedTopDoctors[key],
  }));
  return topDoctors;
}

const PatientHomeScreen: FC = () => {
  const navigation = useNavigation<PatientHomeScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);
  const { runInMounted } = useMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const [topRatedDoctors, setTopRatedDoctors] = useState<Doctor[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    (async () => {
      try {
        showScreenLoading();
        const [news, topRatedDoctors] = await Promise.all([fetchNews(), fetchTopRatedDoctors()]);
        runInMounted(() => {
          setTopRatedDoctors(topRatedDoctors);
          setNews(news);
        });
      } catch (error) {
        showMessage({
          message: error.message || 'Gagal menjangkau server',
          type: 'danger',
        });
      } finally {
        hideScreenLoading();
      }
    })();
  }, [hideScreenLoading, runInMounted, showScreenLoading]);

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
        renderItem={({ item, index }) => {
          return (
            <>
              <AppGap width={16} />
              <DoctorCategoryItem
                key={item.key}
                category={item.value}
                onPress={() =>
                  navigation.navigate('CategoryDoctorsScreen', {
                    category: { id: item.key, name: item.value },
                  })
                }
              />
              {index === specialistOptions.length - 1 && <AppGap width={16} />}
            </>
          );
        }}
      />
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
