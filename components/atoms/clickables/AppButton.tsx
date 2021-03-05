import * as React from 'react';
import { TextStyle, ViewStyle, Text } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import AppTouchable from './AppTouchable';

interface AppButtonProps {
  title: string;
  color: 'primary' | 'flat' | 'accent';
  style?: ViewStyle;
  onPress(): void;
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const buttonStyle: ViewStyle = {
    height: 45,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    ...(props.style ?? {}),
  };
  switch (props.color) {
    case 'primary':
      buttonStyle['backgroundColor'] = Colors.Dark;
      break;
    case 'flat':
      buttonStyle['backgroundColor'] = Colors.White;
      break;
    case 'accent':
      buttonStyle['backgroundColor'] = Colors.Green2;
      break;
    default:
      throw new Error('Unknown button color');
  }

  const textStyle: TextStyle = { fontFamily: Fonts.NunitoSemiBold };
  switch (props.color) {
    case 'primary':
      textStyle['color'] = Colors.White;
      break;
    case 'flat':
      textStyle['color'] = Colors.Dark;
      break;
    case 'accent':
      textStyle['color'] = Colors.White;
      break;
    default:
      throw new Error('Unknown button color');
  }

  return (
    <AppTouchable style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </AppTouchable>
  );
};

export default AppButton;
