import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../../constants/colors';
import patient from '../../constants/dummies/patient';
import Fonts from '../../constants/fonts';
import AppCard from '../atoms/AppCard';
import AppTouchable from '../atoms/clickables/AppTouchable';

interface HomeProfileProps {
  onPress(): void;
}

const HomeProfile: React.FC<HomeProfileProps> = (props) => (
  <AppCard style={styles.card}>
    <AppTouchable style={styles.container} onPress={props.onPress}>
      <Image style={styles.avatar} source={{ uri: patient.photoUrl }} />
      <View>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.occupation}>{patient.occupation}</Text>
      </View>
    </AppTouchable>
  </AppCard>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 46 / 2,
  },
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
