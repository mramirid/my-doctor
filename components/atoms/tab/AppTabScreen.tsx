import * as React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';

interface AppTabScreenProps {
  withScrollView?: boolean;
  style?: ViewStyle;
}

const AppTabScreen: React.FC<AppTabScreenProps> = (props) => (
  <View style={styles.background}>
    <View style={styles.card}>
      {props.withScrollView ? (
        <ScrollView
          style={props.style}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      ) : (
        <View style={props.style}>{props.children}</View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 30,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.Dark,
  },
  card: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
  },
});

export default AppTabScreen;
