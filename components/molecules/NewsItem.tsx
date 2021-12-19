import { format } from 'date-fns';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import { News } from '../../types/news';
import AppBorderedItem from '../atoms/AppBorderedItem';

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
  news: News;
  onPress(): void;
}>;

export default function NewsItem(props: Props) {
  return (
    <AppBorderedItem style={[styles.container, props.style]} onPress={props.onPress}>
      <View style={styles.newsHeading}>
        <Text style={styles.title}>{props.news.title}</Text>
        <Text style={styles.timestamp}>{format(new Date(props.news.timestamp), 'eeee')}</Text>
      </View>
      <Image style={styles.image} source={{ uri: props.news.imageUrl }} />
    </AppBorderedItem>
  );
}

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
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
    maxWidth: '90%',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
