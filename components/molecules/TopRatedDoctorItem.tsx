import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { Doctor } from '../../global-types/user';

interface TopRatedDoctorItemProps {
  style?: ViewStyle;
  doctor: Doctor;
  onPress(): void;
}

const TopRatedDoctorItem: FC<TopRatedDoctorItemProps> = (props) => {
  const stars: JSX.Element[] = [];
  for (let i = 0; i < props.doctor.rating; i++) {
    stars.push(<Ionicons key={i} name="star" size={16} color={Colors.Gold} />);
  }
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Image style={styles.avatar} source={{ uri: props.doctor.photo! }} />
      <View style={styles.profile}>
        <Text style={styles.name}>{props.doctor.fullName}</Text>
        <Text style={styles.occupation}>{props.doctor.occupation}</Text>
      </View>
      <View style={styles.rating}>{stars}</View>
    </TouchableOpacity>
  );
};

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
  occupation: {
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
