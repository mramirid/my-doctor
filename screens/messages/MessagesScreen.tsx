import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import DoctorItem from '../../components/molecules/DoctorItem';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import doctors from '../../constants/dummies/doctors';
import Fonts from '../../constants/fonts';

const pedriaticians = doctors.filter(
  (doctor) => doctor.specialist === DoctorSpecialist.Pediatrician
);

const MessagesScreen: React.FC = () => (
  <AppTabScreen style={styles.screen} indentStatusBar withScrollView>
    <Text style={styles.title}>Messages</Text>
    {pedriaticians.map((doctor) => (
      <DoctorItem
        key={doctor.id}
        doctor={doctor}
        chatPreview="Baik ibu, terima kasih banyak atas wakt..."
      />
    ))}
  </AppTabScreen>
);

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    paddingHorizontal: 16,
  },
});

export default MessagesScreen;
