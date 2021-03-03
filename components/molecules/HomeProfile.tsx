import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface HomeProfileProps {}

const HomeProfile: React.FC<HomeProfileProps> = (props) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={require('../../assets/dummies/patient.png')} />
    <View>
      <Text style={styles.name}>Amir Muhammad Hakim</Text>
      <Text style={styles.occupation}>Software Engineer</Text>
    </View>
  </View>
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
