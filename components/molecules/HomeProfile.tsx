import React, { FC } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Patient from '../../global-types/patient';

interface HomeProfileProps {
  patient: Patient;
  onPress(): void;
}

const HomeProfile: FC<HomeProfileProps> = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Image
      style={styles.avatar}
      source={
        props.patient.photo
          ? { uri: props.patient.photo }
          : require('../../assets/illustrations/user-photo-null.png')
      }
    />
    <View>
      <Text style={styles.name}>{props.patient.fullName}</Text>
      <Text style={styles.occupation}>{props.patient.occupation}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.NunitoSemiBold,
    textTransform: 'capitalize',
  },
  occupation: {
    fontSize: 12,
    color: Colors.Grey2,
    fontFamily: Fonts.NunitoSemiBold,
    textTransform: 'capitalize',
  },
});

export default HomeProfile;
