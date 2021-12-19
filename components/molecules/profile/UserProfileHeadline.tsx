import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import RemovePhoto from '../../../assets/icons/RemovePhoto';
import Colors from '../../../constants/colors';
import usePhotoPicker from '../../../hooks/usePhotoPicker';

type ReadProps = {
  isEdit: false;
  fullName: string;
  occupation: string;
  photo: string | null;
};

type EditProps = {
  isEdit: true;
  photo: string | null;
  onPhotoTaken(pickedPhoto: EditProps['photo']): void;
};

type Props = Readonly<(ReadProps | EditProps) & { style?: StyleProp<ViewStyle> }>;

export default function UserProfileHeadline(props: Props) {
  const { pickPhoto } = usePhotoPicker();

  const startPickPhoto = async () => {
    if (props.isEdit) {
      const pickedPhoto = await pickPhoto();
      if (pickedPhoto) props.onPhotoTaken(pickedPhoto);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
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
}

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
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
    textTransform: 'capitalize',
    marginTop: 16,
  },
  occupation: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    textTransform: 'capitalize',
    marginTop: 2,
  },
});
