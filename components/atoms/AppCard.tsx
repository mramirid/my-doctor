import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface AppCardProps {
  style?: ViewStyle;
}

const AppCard: FC<AppCardProps> = (props) => (
  <View style={{ ...styles.card, ...(props.style ?? {}) }}>{props.children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AppCard;
