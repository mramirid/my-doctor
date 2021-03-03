import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import DoctorItem from '../../components/molecules/DoctorItem';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

const MessagesScreen: React.FC = () => (
  <AppTabScreen style={styles.screen} statusBar>
    <Text style={styles.title}>Messages</Text>
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
    <DoctorItem />
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
