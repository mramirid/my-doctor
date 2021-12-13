import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';

type Props = Readonly<{
  label: string;
  data: string;
  style?: StyleProp<ViewStyle>;
}>;

export default function DoctorProfileInfoItem(props: Props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.data}>{props.data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Grey1,
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginBottom: 6,
  },
  data: {
    fontSize: 14,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
});
