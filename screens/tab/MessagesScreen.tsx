import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import DoctorItem from '../../components/molecules/DoctorItem';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import doctors from '../../constants/dummies/doctors';
import Fonts from '../../constants/fonts';
import { MessagesScreenNavProp } from '../../global-types/navigation';
import withStatusBar from '../../hoc/withStatusBar';

const pedriaticians = doctors.filter(
  (doctor) => doctor.specialist === DoctorSpecialist.Pediatrician
);

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation<MessagesScreenNavProp>();
  return (
    <AppTabScreen style={styles.screen} withScrollView>
      <Text style={styles.title}>Messages</Text>
      {pedriaticians.map((doctor) => (
        <DoctorItem
          key={doctor.id}
          doctor={doctor}
          description="Baik ibu, terima kasih banyak atas wakt..."
          onPress={() => navigation.navigate('ChatRoomScreen', { doctor })}
        />
      ))}
    </AppTabScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});

export default withStatusBar(MessagesScreen, 'dark', Colors.White);
