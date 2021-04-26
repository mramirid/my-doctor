import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';

interface AppBorderedItemProps {
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}

const AppBorderedItem: FC<AppBorderedItemProps> = (props) => (
  <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
    {props.children}
  </TouchableOpacity>
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
