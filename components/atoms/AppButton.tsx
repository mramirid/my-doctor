import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

type Props = Readonly<{
  title: string;
  color: 'primary' | 'flat' | 'accent';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress(): void;
}>;

const AppButton: FC<Props> = (props) => {
  const buttonStyle = Object.assign<ViewStyle, ViewStyle>(
    styles.baseButtonStyle,
    StyleSheet.flatten(props.style)
  );
  const textStyle: TextStyle = {
    fontSize: 18,
    fontFamily: Fonts.NunitoSemiBold,
  };

  if (props.disabled) {
    buttonStyle.backgroundColor = Colors.Grey1;
    textStyle.color = Colors.Grey3;
  } else {
    switch (props.color) {
      case 'primary':
        buttonStyle.backgroundColor = Colors.Dark;
        textStyle.color = Colors.White;
        break;
      case 'flat':
        buttonStyle.backgroundColor = Colors.White;
        textStyle.color = Colors.Dark;
        break;
      case 'accent':
        buttonStyle.backgroundColor = Colors.Green2;
        textStyle.color = Colors.White;
        break;
    }
  }

  return (
    <TouchableOpacity style={buttonStyle} disabled={props.disabled} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButtonStyle: {
    height: 45,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppButton;
