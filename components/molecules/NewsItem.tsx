import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface NewsItemProps {}

const NewsItem: React.FC<NewsItemProps> = (props) => (
  <View>
    <Text>News Item Component</Text>
  </View>
);

const styles = StyleSheet.create({});

export default NewsItem;
