import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import fireApp from '../../config/firebase';
import Colors from '../../constants/colors';
import withStatusBar from '../../hoc/withStatusBar';
import useMounted from '../../hooks/useMounted';
import { AppStackParamList } from '../../navigation/AppStack';
import { HomeTabParamList } from '../../navigation/HomeTab';
import { selectUserAuth } from '../../store/reducers/auth';
import { useAppSelector } from '../../store/types';
import { DBNews, News } from '../../types/news';

type DoctorHomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'DoctorHomeScreen'>,
  StackNavigationProp<AppStackParamList>
>;

async function fetchNews() {
  const data = await fireApp
    .database()
    .ref('news')
    .orderByChild('timestamp')
    .limitToLast(3)
    .once('value');

  const fetchedNews: DBNews | null = data.val();
  if (!fetchedNews) return [];

  const news = Object.entries(fetchedNews).map<News>(([id, newsData]) => ({ id, ...newsData }));
  return news;
}

function DoctorHomeScreen() {
  const navigation = useNavigation<DoctorHomeScreenNavProp>();
  const { runInMounted } = useMounted();

  const userAuth = useAppSelector(selectUserAuth);
  const [news, setNews] = useState({
    isFetching: true,
    data: [] as News[],
  });

  useEffect(() => {
    (async () => {
      try {
        const news = await fetchNews();
        runInMounted(() => setNews({ isFetching: false, data: news }));
      } catch (error: any) {
        showMessage({
          message: error.message ?? 'Gagal menjangkau server',
          type: 'danger',
          statusBarHeight: Constants.statusBarHeight,
        });
      }
    })();
  }, [runInMounted]);

  return (
    <AppTabScreen style={styles.screen} withScrollView>
      <HomeProfile
        style={styles.homeProfile}
        fullName={userAuth.fullName!}
        occupation={userAuth.occupation!}
        photo={userAuth.photo}
        onPress={() => navigation.navigate('UserProfileScreen')}
      />
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
  homeProfile: {
    paddingHorizontal: 16,
  },
  welcomeText: {
    maxWidth: 209,
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
    marginTop: 30,
    marginBottom: 16,
  },
  sectionLabel: {
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
  },
  fetchLoadingContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItem: {
    marginTop: 16,
  },
});

export default withStatusBar(DoctorHomeScreen, 'dark', Colors.White);
