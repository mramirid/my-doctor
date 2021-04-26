import React, { FC } from 'react';
import { TextStyle, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AppLinkProps {
  style?: TextStyle;
  onPress(): void;
}

const AppLink: FC<AppLinkProps> = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={[styles.textLink, props.style]}>{props.children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textLink: {
    fontSize: 12,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Grey2,
    textDecorationLine: 'underline',
  },
});

export default AppLink;
