import Constants from 'expo-constants';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import AppGap from '../AppGap';

interface AppTabScreenProps {
  statusBar?: boolean;
  style?: ViewStyle;
}

const AppTabScreen: React.FC<AppTabScreenProps> = (props) => {
  let statusBarHeight = 0;
  if (props.statusBar && Platform.OS === 'android') {
    statusBarHeight = Constants.statusBarHeight;
  }
  return (
    <View style={styles.background}>
      <AppGap height={statusBarHeight} backgroundColor={Colors.White} />
      <View style={styles.card}>
        <ScrollView contentContainerStyle={props.style} showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      </View>
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
});

export default AppTabScreen;
