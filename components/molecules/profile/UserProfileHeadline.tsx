import React, { FC, memo, useCallback } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import RemovePhoto from '../../../assets/icons/RemovePhoto';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import usePhotoPicker from '../../../hooks/usePhotoPicker';

interface ReadonlyProps {
  fullName: string;
  occupation: string;
  photo: string | null;
  isEdit: false;
  style?: ViewStyle;
}

interface EditProps {
  isEdit: true;
  photo: string | null;
  onPhotoTaken(pickedPhoto: string | null): void;
  style?: ViewStyle;
}

const UserProfileHeadline: FC<ReadonlyProps | EditProps> = (props) => {
  const { pickPhoto } = usePhotoPicker();

  const startPickPhoto = useCallback(async () => {
    if (props.isEdit) {
      const pickedPhoto = await pickPhoto();
      if (pickedPhoto) props.onPhotoTaken(pickedPhoto);
    }
  }, [pickPhoto, props]);

  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.isEdit ? (
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={startPickPhoto}>
            <Image
              style={styles.avatar}
              source={
                props.photo
                  ? { uri: props.photo }
                  : require('../../../assets/illustrations/user-photo-null.png')
              }
            />
          </TouchableOpacity>
          <RemovePhoto style={styles.removePhotoIcon} onPress={() => props.onPhotoTaken(null)} />
        </View>
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                props.photo
                  ? { uri: props.photo }
                  : require('../../../assets/illustrations/user-photo-null.png')
              }
            />
          </View>
          <Text style={styles.fullName}>{props.fullName}</Text>
          <Text style={styles.occupation}>{props.occupation}</Text>
        </>
      )}
    </View>
  );
};

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
  fullName: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    textTransform: 'capitalize',
    marginTop: 16,
  },
  occupation: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    textTransform: 'capitalize',
    marginTop: 2,
  },
});

export default memo(UserProfileHeadline);
