import * as React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface LinkProps {
  style?: TextStyle;
}

const Link: React.FC<LinkProps> = (props) => (
  <Text style={{ ...styles.link, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  link: {
    fontSize: 12,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Light,
    textDecorationLine: 'underline',
  },
});

export default Link;
