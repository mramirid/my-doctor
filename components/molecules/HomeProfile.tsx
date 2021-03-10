import React, { FC } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import patient from '../../constants/dummies/patient';
import Fonts from '../../constants/fonts';

interface HomeProfileProps {
  onPress(): void;
}

const HomeProfile: FC<HomeProfileProps> = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Image style={styles.avatar} source={{ uri: patient.photoUrl }} />
    <View>
      <Text style={styles.name}>{patient.name}</Text>
      <Text style={styles.occupation}>{patient.occupation}</Text>
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
  },
  occupation: {
    fontSize: 12,
    color: Colors.Grey2,
    fontFamily: Fonts.NunitoSemiBold,
  },
});

export default HomeProfile;
