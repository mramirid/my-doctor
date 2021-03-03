import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AppBorderedItem from '../atoms/AppBorderedItem';

interface HospitalItemProps {}

const HospitalItem: React.FC<HospitalItemProps> = (props) => (
  <AppBorderedItem style={styles.container}>
    <Image style={styles.image} source={require('../../assets/dummies/hospital_citra_bunga.png')} />
    <View>
      <Text style={styles.name}>Rumah Sakit Citra Bunga Merdeka</Text>
      <Text style={styles.address}>Jln. Surya Sejahtera 20</Text>
    </View>
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 17,
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  address: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Grey2,
    marginTop: 6,
  },
});

export default HospitalItem;
