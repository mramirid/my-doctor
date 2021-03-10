import React, { FC, memo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import RemovePhoto from '../../../assets/icons/RemovePhoto';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';

interface UserProfileWithPhotoProps {
  name?: string;
  description?: string;
  photoUrl: string;
  onRemoveAvatar?: () => void;
  style?: ViewStyle;
}

const UserProfileWithPhoto: FC<UserProfileWithPhotoProps> = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <View style={styles.avatarContainer}>
      <Image style={styles.avatar} source={{ uri: props.photoUrl }} />
      {props.onRemoveAvatar && <RemovePhoto style={styles.removePhotoIcon} />}
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
  removePhotoIcon: {
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

export default memo(UserProfileWithPhoto);
