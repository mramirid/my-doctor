import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GeneralPractitioner from '../../assets/icons/doctor-categories/GeneralPractitioner';
import Medicine from '../../assets/icons/doctor-categories/Medicine';
import Pediatrician from '../../assets/icons/doctor-categories/Pediatrician';
import Psychiatrist from '../../assets/icons/doctor-categories/Psychiatrist';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import Fonts from '../../constants/fonts';
import AppCard from '../atoms/AppCard';

interface DoctorCategoryItemProps {
  category: DoctorSpecialist;
  onPress(): void;
}

const DoctorCategoryItem: React.FC<DoctorCategoryItemProps> = (props) => {
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
        <Text style={styles.label}>Saya butuh</Text>
        <Text style={styles.name}>{props.category}</Text>
      </TouchableOpacity>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 130,
    backgroundColor: Colors.Green1,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  content: {
    padding: 12,
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

export default DoctorCategoryItem;
