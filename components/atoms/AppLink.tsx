import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';

type Props = Readonly<{
  style?: TextStyle;
  onPress(): void;
}>;

const AppLink: FC<Props> = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Text style={[styles.textLink, props.style]}>{props.children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  textLink: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    textDecorationLine: 'underline',
  },
});

export default AppLink;
