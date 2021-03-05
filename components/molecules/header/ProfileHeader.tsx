import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Doctor from '../../../global-types/doctor';
import AppTouchable from '../../atoms/clickables/AppTouchable';

interface ProfileHeaderProps {
  doctor: Doctor;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ doctor }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppTouchable style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.White} />
      </AppTouchable>
      <View style={styles.profile}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialist}>{doctor.specialist}</Text>
      </View>
      <Image style={styles.avatar} source={{ uri: doctor.photoUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Colors.Dark,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.White,
    fontSize: 20,
  },
  specialist: {
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey3,
    fontSize: 14,
    marginTop: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    marginRight: 12,
  },
});

export default React.memo(ProfileHeader);
