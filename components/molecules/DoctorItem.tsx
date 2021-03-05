import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import Doctor from '../../global-types/doctor';
import AppBorderedItem from '../atoms/AppBorderedItem';

interface DoctorItemProps {
  doctor: Doctor;
  description?: string;
  withArrowIcon?: boolean;
  style?: ViewStyle;
  onPress(): void;
}

const DoctorItem: React.FC<DoctorItemProps> = (props) => (
  <AppBorderedItem style={{ ...styles.container, ...props.style }} onPress={props.onPress}>
    <Image style={styles.avatar} source={{ uri: props.doctor.photoUrl }} />
    <View style={styles.infoText}>
      <Text style={styles.title}>{props.doctor.name}</Text>
      {props.description && <Text style={styles.description}>{props.description}</Text>}
    </View>
    {props.withArrowIcon && <MaterialIcons name="navigate-next" size={icons.size} color="black" />}
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Grey2,
  },
});

export default DoctorItem;
