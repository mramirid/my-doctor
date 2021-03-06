import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Doctor from '../../global-types/doctor';

interface TopRatedDoctorItemProps {
  style?: ViewStyle;
  doctor: Doctor;
  onPress(): void;
}

const TopRatedDoctorItem: React.FC<TopRatedDoctorItemProps> = (props) => (
  <TouchableOpacity style={{ ...styles.container, ...(props.style ?? {}) }} onPress={props.onPress}>
    <Image style={styles.avatar} source={{ uri: props.doctor.photoUrl }} />
    <View style={styles.profile}>
      <Text style={styles.name}>{props.doctor.name}</Text>
      <Text style={styles.specialist}>{props.doctor.specialist}</Text>
    </View>
    <View style={styles.rating}>
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
  },
  specialist: {
    fontSize: 12,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 2,
  },
  rating: {
    flexDirection: 'row',
  },
});

export default TopRatedDoctorItem;
