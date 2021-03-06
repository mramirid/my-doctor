import * as React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface ProfileWithPhotoProps {
  name: string;
  occupation: string;
  photoUrl: string;
  style?: ViewStyle;
}

const ProfileWithPhoto: React.FC<ProfileWithPhotoProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <View style={styles.avatarContainer}>
      <Image style={styles.avatar} source={{ uri: props.photoUrl }} />
    </View>
    <Text style={styles.name}>{props.name}</Text>
    <Text style={styles.occupation}>{props.occupation}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.Grey1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 130 / 2,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    marginTop: 16,
  },
  occupation: {},
});

export default ProfileWithPhoto;
