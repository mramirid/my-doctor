import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface HomeProfileProps {
  fullName: string;
  occupation: string;
  photo?: string | null;
  onPress(): void;
  style?: ViewStyle;
}

const HomeProfile: FC<HomeProfileProps> = (props) => (
  <TouchableOpacity style={{ ...styles.container, ...props.style }} onPress={props.onPress}>
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
    fontFamily: Fonts.NunitoSemiBold,
  },
  occupation: {
    fontSize: 12,
    color: Colors.Grey2,
    fontFamily: Fonts.NunitoSemiBold,
  },
});

export default HomeProfile;
