import React, { FC, memo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import RemovePhoto from '../../../assets/icons/RemovePhoto';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Patient from '../../../global-types/patient';

interface ReadonlyProps {
  patient: Patient;
  isEdit: false;
  style?: ViewStyle;
}

interface EditProps {
  patient: Patient;
  isEdit: true;
  onRemoveAvatar: () => void;
  style?: ViewStyle;
}

const UserProfileWithPhoto: FC<ReadonlyProps | EditProps> = (props) => {
  const userPohoto = props.patient.photo
    ? { uri: props.patient.photo }
    : require('../../../assets/illustrations/user-photo-null.png');

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={userPohoto} />
        {props.isEdit && <RemovePhoto style={styles.removePhotoIcon} />}
      </View>
      {!props.isEdit && <Text style={styles.fullName}>{props.patient.fullName}</Text>}
      {!props.isEdit && <Text style={styles.occupation}>{props.patient.occupation}</Text>}
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
    marginTop: 16,
  },
  occupation: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    marginTop: 2,
  },
});

export default memo(UserProfileWithPhoto);
