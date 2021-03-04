import Constants from 'expo-constants';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import AppGap from '../AppGap';

interface AppTabScreenProps {
  indentStatusBar?: boolean;
  withScrollView?: boolean;
  style?: ViewStyle;
}

const AppTabScreen: React.FC<AppTabScreenProps> = (props) => {
  let statusBarHeight = 0;
  if (props.indentStatusBar && Platform.OS === 'android') {
    statusBarHeight = Constants.statusBarHeight;
  }

  let content: JSX.Element;
  if (props.withScrollView) {
    content = (
      <ScrollView contentContainerStyle={props.style} showsVerticalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    );
  } else {
    content = <View style={{ ...props.style, flex: 1 }}>{props.children}</View>;
  }

  return (
    <View style={styles.background}>
      <AppGap height={statusBarHeight} backgroundColor={Colors.White} />
      <View style={styles.card}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
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
