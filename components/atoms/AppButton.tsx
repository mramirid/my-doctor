import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/colors';

type Props = Readonly<{
  title: string;
  color: 'primary' | 'flat' | 'accent';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress(): void;
}>;

export default function AppButton(props: Props) {
  const buttonStyle = StyleSheet.flatten(StyleSheet.compose(baseButtonStyles, props.style));
  const textStyle: TextStyle = {
    fontSize: 18,
    fontFamily: 'Nunito_600SemiBold',
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
}

const baseButtonStyles: StyleProp<ViewStyle> = {
  height: 45,
  paddingVertical: 10,
  borderRadius: 10,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
};
