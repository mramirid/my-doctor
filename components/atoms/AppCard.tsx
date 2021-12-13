import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type Props = {
  readonly style?: StyleProp<ViewStyle>;
};

const AppCard: FC<Props> = (props) => (
  <View style={[styles.card, props.style]}>{props.children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AppCard;
