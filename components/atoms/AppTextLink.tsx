import * as React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AppTextLinkProps {
  style?: TextStyle;
}

const AppTextLink: React.FC<AppTextLinkProps> = (props) => (
  <Text style={{ ...styles.textLink, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  textLink: {
    fontSize: 12,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Light,
    textDecorationLine: 'underline',
  },
});

export default AppTextLink;
