import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import { Hospital } from '../../types/hospital';
import AppBorderedItem from '../atoms/AppBorderedItem';

type Props = Readonly<{
  hospital: Hospital;
  onPress(): void;
}>;

export default function HospitalItem(props: Props) {
  return (
    <AppBorderedItem style={styles.container} onPress={props.onPress}>
      <Image style={styles.image} source={{ uri: props.hospital.imageUrl }} />
      <View>
        <Text style={styles.name}>{props.hospital.type}</Text>
        <Text style={styles.name}>{props.hospital.name}</Text>
        <Text style={styles.address}>{props.hospital.address}</Text>
      </View>
    </AppBorderedItem>
  );
}

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
    fontFamily: 'Nunito_400Regular',
    color: Colors.Dark,
  },
  address: {
    fontSize: 12,
    fontFamily: 'Nunito_300Light',
    color: Colors.Grey2,
    marginTop: 6,
  },
});
