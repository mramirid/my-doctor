import React, { FC, memo, useCallback } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import RemovePhoto from '../../../assets/icons/RemovePhoto';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Patient from '../../../global-types/patient';
import usePhotoPicker from '../../../hooks/usePhotoPicker';

interface ReadonlyProps {
  patient: Patient;
  isEdit: false;
  style?: ViewStyle;
}

interface EditProps {
  isEdit: true;
  photo: string | null;
  onPhotoTaken(pickedPhoto: string | null): void;
  style?: ViewStyle;
}

const UserProfileWithPhoto: FC<ReadonlyProps | EditProps> = (props) => {
  const { pickPhoto } = usePhotoPicker();

  const startPickPhoto = useCallback(async () => {
    if (props.isEdit) props.onPhotoTaken(await pickPhoto());
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
                props.patient.photo
                  ? { uri: props.patient.photo }
                  : require('../../../assets/illustrations/user-photo-null.png')
              }
            />
          </View>
          <Text style={styles.fullName}>{props.patient.fullName}</Text>
          <Text style={styles.occupation}>{props.patient.occupation}</Text>
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

export default memo(UserProfileWithPhoto);