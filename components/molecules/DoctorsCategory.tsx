import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import CatRegularDoctor from '../../assets/icons/CatRegularDoctor';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AppCard from '../atoms/AppCard';

interface DoctorsCategoryProps {}

const DoctorsCategory: React.FC<DoctorsCategoryProps> = (props) => (
  <AppCard style={styles.container}>
    <CatRegularDoctor style={styles.icon} />
    <Text style={styles.label}>Saya butuh</Text>
    <Text style={styles.name}>Dokter Umum</Text>
  </AppCard>
);

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 130,
    padding: 12,
    backgroundColor: Colors.Green3,
    alignSelf: 'flex-start',
    marginRight: 10,
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

export default DoctorsCategory;
