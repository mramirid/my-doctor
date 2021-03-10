import { useNavigation, useRoute } from '@react-navigation/core';
import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import AppButton from '../components/atoms/AppButton';
import Header from '../components/molecules/header/Header';
import DoctorProfileInfoItem from '../components/molecules/profile/DoctorProfileInfoItem';
import DoctorProfileWithPhoto from '../components/molecules/profile/DoctorProfileWithPhoto';
import Colors from '../constants/colors';
import {
  DoctorProfileScreenNavProp,
  DoctorProfileScreenRouteProp,
} from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const DoctorProfileScreen: FC = () => {
  const navigation = useNavigation<DoctorProfileScreenNavProp>();
  const { params } = useRoute<DoctorProfileScreenRouteProp>();

  return (
    <View style={styles.screen}>
      <Header title="Profile Dokter" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <DoctorProfileWithPhoto
          style={styles.profileWithPhoto}
          name={params.doctor.name}
          description={params.doctor.specialist}
          photoUrl={params.doctor.photoUrl}
          gender={params.doctor.gender}
        />
        <DoctorProfileInfoItem
          style={styles.profileItem}
          label="Alumnus"
          data={params.doctor.almamater}
        />
        <DoctorProfileInfoItem
          style={styles.profileItem}
          label="Tempat Praktik"
          data={params.doctor.workplace}
        />
        <DoctorProfileInfoItem
          style={styles.profileItem}
          label="No. STR"
          data={params.doctor.credentialID}
        />
        <AppButton
          style={styles.button}
          title="Start Consultation"
          color="accent"
          onPress={() => navigation.navigate('ChatRoomScreen', { doctor: params.doctor })}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileWithPhoto: {
    marginTop: 10,
    marginBottom: 26,
  },
  profileItem: {
    marginBottom: 16,
  },
  button: {
    marginTop: 7,
    marginBottom: 40,
    marginHorizontal: 24,
  },
});

export default withStatusBar(DoctorProfileScreen, 'dark', Colors.White);
