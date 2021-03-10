import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC, memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Doctor from '../../../global-types/doctor';

interface ProfileHeaderProps {
  doctor: Doctor;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ doctor }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.White} />
      </TouchableOpacity>
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
    maxHeight: 107,
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: Colors.Dark,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 24,
    width: 24,
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
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
});

export default memo(ProfileHeader);
