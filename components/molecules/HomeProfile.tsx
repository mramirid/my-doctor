import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Colors from '../../constants/colors';

type Props = Readonly<{
  fullName: string;
  occupation: string;
  photo: string | null;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
}>;

export default function HomeProfile(props: Props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Image
        style={styles.avatar}
        source={
          props.photo
            ? { uri: props.photo }
            : require('../../assets/illustrations/user-photo-null.png')
        }
      />
      <View>
        <Text style={styles.name}>{props.fullName}</Text>
        <Text style={styles.occupation}>{props.occupation}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
  occupation: {
    fontSize: 12,
    color: Colors.Grey2,
    fontFamily: 'Nunito_600SemiBold',
  },
});
