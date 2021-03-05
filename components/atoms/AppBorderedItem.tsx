import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import AppTouchable from './clickables/AppTouchable';

interface AppBorderedItemProps {
  style?: ViewStyle;
  onPress(): void;
}

const AppBorderedItem: React.FC<AppBorderedItemProps> = (props) => (
  <View>
    <AppTouchable style={{ ...styles.container, ...(props.style ?? {}) }} onPress={props.onPress}>
      {props.children}
    </AppTouchable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Grey1,
  },
});

export default AppBorderedItem;
