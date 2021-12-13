import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GeneralPractitioner from '../../assets/icons/doctor-categories/GeneralPractitioner';
import Medicine from '../../assets/icons/doctor-categories/Medicine';
import Pediatrician from '../../assets/icons/doctor-categories/Pediatrician';
import Psychiatrist from '../../assets/icons/doctor-categories/Psychiatrist';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { DoctorSpecialist } from '../../constants/user';
import AppCard from '../atoms/AppCard';

type Props = Readonly<{
  category: DoctorSpecialist | string;
  onPress(): void;
}>;

export default function DoctorCategoryItem(props: Props) {
  let icon: JSX.Element;
  switch (props.category) {
    case DoctorSpecialist.GeneralPractitioner:
      icon = <GeneralPractitioner />;
      break;
    case DoctorSpecialist.Psychiatrist:
      icon = <Psychiatrist />;
      break;
    case DoctorSpecialist.Medicine:
      icon = <Medicine />;
      break;
    case DoctorSpecialist.Pediatrician:
      icon = <Pediatrician />;
      break;
    default:
      icon = <GeneralPractitioner />;
  }

  return (
    <AppCard style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={props.onPress}>
        <View style={styles.icon}>{icon}</View>
        <View>
          <Text style={styles.label}>Saya butuh</Text>
          <Text style={styles.name} numberOfLines={1}>
            {props.category}
          </Text>
        </View>
      </TouchableOpacity>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 130,
    backgroundColor: Colors.Green1,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  icon: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Dark,
  },
  name: {
    fontSize: 12,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
  },
});
