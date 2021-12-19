import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import FemaleSymbol from '../../../assets/icons/FemaleSymbol';
import MaleSymbol from '../../../assets/icons/MaleSymbol';
import Colors from '../../../constants/colors';
import { Gender } from '../../../constants/user';

type Props = Readonly<{
  name: string;
  occupation: string;
  gender: Gender;
  photo: string | null;
  style?: StyleProp<ViewStyle>;
}>;

export default function DoctorProfileHeading(props: Props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            props.photo
              ? { uri: props.photo }
              : require('../../../assets/illustrations/user-photo-null.png')
          }
        />
        {props.gender === Gender.Male ? (
          <MaleSymbol style={styles.genderIcon} />
        ) : (
          <FemaleSymbol style={styles.genderIcon} />
        )}
      </View>
      {props.name && <Text style={styles.name}>{props.name}</Text>}
      {props.occupation && <Text style={styles.occupation}>{props.occupation}</Text>}
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
  genderIcon: {
    position: 'absolute',
    right: 6,
    bottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
    marginTop: 16,
  },
  occupation: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    marginTop: 2,
  },
});
