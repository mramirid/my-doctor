import React, { FC } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface DoctorProfileItemProps {
  label: string;
  data: string;
  style?: ViewStyle;
}

const DoctorProfileItem: FC<DoctorProfileItemProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <Text style={styles.label}>{props.label}</Text>
    <Text style={styles.data}>{props.data}</Text>
  </View>
);

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

export default DoctorProfileItem;
