import React, { FC, memo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import FemaleSymbol from '../../assets/icons/FemaleSymbol';
import MaleSymbol from '../../assets/icons/MaleSymbol';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Gender from '../../constants/gender';

interface ProfileWithPhotoProps {
  name?: string;
  description?: string;
  photoUrl: string;
  gender: Gender;
  style?: ViewStyle;
}

const ProfileWithPhoto: FC<ProfileWithPhotoProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <View style={styles.avatarContainer}>
      <Image style={styles.avatar} source={{ uri: props.photoUrl }} />
      {props.gender === Gender.Male ? (
        <MaleSymbol style={styles.genderIcon} />
      ) : (
        <FemaleSymbol style={styles.genderIcon} />
      )}
    </View>
    {props.name && <Text style={styles.name}>{props.name}</Text>}
    {props.description && <Text style={styles.description}>{props.description}</Text>}
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
  genderIcon: {
    position: 'absolute',
    right: 6,
    bottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 2,
  },
});

export default memo(ProfileWithPhoto);
