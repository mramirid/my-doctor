import { useRoute } from '@react-navigation/core';
import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import AppButton from '../components/atoms/AppButton';
import DoctorProfileItem from '../components/molecules/DoctorProfileItem';
import ProfileWithPhoto from '../components/molecules/ProfileWithPhoto';
import Header from '../components/molecules/header/Header';
import Colors from '../constants/colors';
import { DoctorProfileScreenRouteProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const DoctorProfileScreen: React.FC = () => {
  const { params } = useRoute<DoctorProfileScreenRouteProp>();
  return (
    <View style={styles.screen}>
      <Header title="Profile Dokter" type="flat" />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <ProfileWithPhoto
          style={styles.profileWithPhoto}
          name={params.doctor.name}
          description={params.doctor.specialist}
          photoUrl={params.doctor.photoUrl}
          onRemoveAvatar={() => null}
        />
        <DoctorProfileItem
          style={styles.profileItem}
          label="Alumnus"
          data={params.doctor.almamater}
        />
        <DoctorProfileItem
          style={styles.profileItem}
          label="Tempat Praktik"
          data={params.doctor.workplace}
        />
        <DoctorProfileItem
          style={styles.profileItem}
          label="No. STR"
          data={params.doctor.credentialID}
        />
        <AppButton
          style={styles.button}
          title="Start Consultation"
          color="accent"
          onPress={() => null}
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
