import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface TopRatedDoctorItemProps {
  style?: ViewStyle;
}

const TopRatedDoctorItem: React.FC<TopRatedDoctorItemProps> = (props) => (
  <View style={{ ...styles.container, ...(props.style ?? {}) }}>
    <Image
      style={styles.avatar}
      source={{ uri: 'https://i.ibb.co/yX7n5zD/doctor-alexa-rachel.png' }}
    />
    <View style={styles.profile}>
      <Text style={styles.name}>Alexa Rachel</Text>
      <Text style={styles.specialist}>Pediatrician</Text>
    </View>
    <View style={styles.rating}>
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
      <Ionicons name="star" size={16} color={Colors.Gold} />
    </View>
  </View>
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
