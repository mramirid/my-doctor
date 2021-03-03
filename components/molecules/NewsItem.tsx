import * as React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface NewsItemProps {
  style?: ViewStyle;
}

const NewsItem: React.FC<NewsItemProps> = (props) => (
  <View style={{ ...styles.container, ...(props.style ?? {}) }}>
    <View style={styles.newsHeading}>
      <Text style={styles.title}>Is it safe to stay at home during coronavirus?</Text>
      <Text style={styles.date}>Today</Text>
    </View>
    <Image style={styles.image} source={require('../../assets/dummies/news_building.png')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Grey1,
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
