import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppGap from '../../components/atoms/AppGap';
import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import HomeProfile from '../../components/molecules/HomeProfile';
import NewsItem from '../../components/molecules/NewsItem';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { AppLoadingIndicatorContext } from '../../contexts/app-loading-indicator';
import { DoctorHomeScreenNavProp } from '../../global-types/navigation';
import { FireNews, News } from '../../global-types/news';
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

const DoctorHomeScreen: FC = () => {
  const navigation = useNavigation<DoctorHomeScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    (async () => {
      try {
        showScreenLoading();
        setNews(await fetchNews());
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
      <HomeProfile
        style={styles.homeProfile}
        fullName={userAuth.fullName!}
        occupation={userAuth.occupation!}
        photo={userAuth.photo}
        onPress={() => navigation.navigate('UserProfileScreen')}
      />
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
  homeProfile: {
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
  sectionLabel: {
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
  },
  newsItem: {
    marginTop: 16,
  },
});

export default withStatusBar(DoctorHomeScreen, 'dark', Colors.White);
