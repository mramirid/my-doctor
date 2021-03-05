import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Doctor from '../../global-types/doctor';
import AppBorderedItem from '../atoms/AppBorderedItem';

interface DoctorItemProps {
  doctor: Doctor;
  extra: string;
}

const DoctorItem: React.FC<DoctorItemProps> = (props) => (
  <AppBorderedItem style={styles.container}>
    <Image style={styles.avatar} source={{ uri: props.doctor.photoUrl }} />
    <View>
      <Text style={styles.title}>{props.doctor.name}</Text>
      <Text style={styles.extra}>{props.extra}</Text>
    </View>
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  extra: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Grey2,
  },
});

export default DoctorItem;
