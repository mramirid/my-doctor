import { format } from 'date-fns';
import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { News } from '../../global-types/news';
import AppBorderedItem from '../atoms/AppBorderedItem';

interface NewsItemProps {
  style?: ViewStyle;
  news: News;
  onPress(): void;
}

const NewsItem: FC<NewsItemProps> = (props) => (
  <AppBorderedItem style={{ ...styles.container, ...(props.style ?? {}) }} onPress={props.onPress}>
    <View style={styles.newsHeading}>
      <Text style={styles.title}>{props.news.title}</Text>
      <Text style={styles.timestamp}>{format(new Date(props.news.timestamp), 'eeee')}</Text>
    </View>
    <Image style={styles.image} source={{ uri: props.news.imageUrl }} />
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  timestamp: {
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
