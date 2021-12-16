import React, { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}>;

const AppBorderedItem: FC<Props> = (props) => (
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
