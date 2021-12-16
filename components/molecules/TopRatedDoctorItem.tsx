import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Colors from '../../constants/colors';
import { Doctor } from '../../types/user';

type Props = Readonly<{
  style?: StyleProp<ViewStyle>;
  doctor: Doctor;
  onPress(): void;
}>;

export default function TopRatedDoctorItem(props: Props) {
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
}

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
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
  },
  occupation: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    marginTop: 2,
  },
  rating: {
    flexDirection: 'row',
  },
});
