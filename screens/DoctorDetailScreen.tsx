import { useNavigation, useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppButton from '../components/atoms/AppButton';
import Header from '../components/molecules/header/Header';
import DoctorProfileHeading from '../components/molecules/profile/DoctorProfileHeading';
import DoctorProfileInfoItem from '../components/molecules/profile/DoctorProfileInfoItem';
import Colors from '../constants/colors';
import withStatusBar from '../hoc/withStatusBar';
import { AppStackParamList } from '../navigation/AppStack';

type DoctorDetailScreenRouteProp = RouteProp<AppStackParamList, 'DoctorDetailScreen'>;
type DoctorDetailScreenNavProp = StackNavigationProp<AppStackParamList, 'DoctorDetailScreen'>;

function DoctorDetailScreen() {
  const navigation = useNavigation<DoctorDetailScreenNavProp>();
  const { params } = useRoute<DoctorDetailScreenRouteProp>();

  return (
    <View style={styles.screen}>
      <Header title="Profile Dokter" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <DoctorProfileHeading
          style={styles.profileWithPhoto}
          name={params.doctor.fullName}
          occupation={params.doctor.occupation}
          photo={params.doctor.photo}
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
          data={params.doctor.credentialId}
        />
        <AppButton
          style={styles.button}
          title="Start Consultation"
          color="accent"
          onPress={() => navigation.navigate('ChatRoomScreen', { partner: params.doctor })}
        />
      </ScrollView>
    </View>
  );
}

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

export default withStatusBar(DoctorDetailScreen, 'dark', Colors.White);
