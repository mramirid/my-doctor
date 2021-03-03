import * as React from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';

import Colors from '../../../constants/colors';

interface AppTabScreenProps {
  screenStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

const AppTabScreen: React.FC<AppTabScreenProps> = (props) => (
  <View style={{ ...styles.screen, ...(props.screenStyle ?? {}) }}>
    <ScrollView
      style={{ ...styles.scrollView, ...(props.scrollViewStyle ?? {}) }}
      contentContainerStyle={{ ...styles.scrollViewContent, ...(props.contentStyle ?? {}) }}
      showsVerticalScrollIndicator={false}>
      {props.children}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Dark,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollViewContent: {
    paddingTop: 30,
  },
});

export default AppTabScreen;
