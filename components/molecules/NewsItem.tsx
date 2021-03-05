import * as React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AppBorderedItem from '../atoms/AppBorderedItem';

interface NewsItemProps {
  style?: ViewStyle;
}

const NewsItem: React.FC<NewsItemProps> = (props) => (
  <AppBorderedItem style={{ ...styles.container, ...(props.style ?? {}) }} onPress={() => null}>
    <View style={styles.newsHeading}>
      <Text style={styles.title}>Is it safe to stay at home during coronavirus?</Text>
      <Text style={styles.date}>Today</Text>
    </View>
    <Image style={styles.image} source={require('../../assets/dummies/news-building.png')} />
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  newsHeading: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    maxWidth: '90%',
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});

export default NewsItem;
