import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';

interface AppBorderedItemProps {
  style?: ViewStyle;
}

const AppBorderedItem: React.FC<AppBorderedItemProps> = (props) => (
  <View style={{ ...styles.container, ...(props.style ?? {}) }}>{props.children}</View>
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
