import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface DoctorItemProps {}

const DoctorItem: React.FC<DoctorItemProps> = (props) => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={require('../../assets/dummies/doctor_alexander_jannie.png')}
    />
    <View>
      <Text style={styles.title}>List Doctor</Text>
      <Text style={styles.chatPreview}>Baik ibu, terima kasih banyak atas wakt...</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Grey1,
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
  chatPreview: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Grey2,
  },
});

export default DoctorItem;
