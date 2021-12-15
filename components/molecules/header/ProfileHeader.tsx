import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../constants/colors';
import { Doctor, Patient } from '../../../types/user';

type Props = {
  readonly partner: Patient | Doctor;
};

export default function ProfileHeader(props: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.White} />
      </TouchableOpacity>
      <View style={styles.profile}>
        <Text style={styles.name}>{props.partner.fullName}</Text>
        <Text style={styles.occupation}>{props.partner.occupation}</Text>
      </View>
      <Image style={styles.avatar} source={{ uri: props.partner.photo! }} />
    </View>
  );
}

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
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.White,
    fontSize: 20,
  },
  occupation: {
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey4,
    fontSize: 14,
    marginTop: 6,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
});
