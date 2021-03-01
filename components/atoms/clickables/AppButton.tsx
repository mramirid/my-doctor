import * as React from 'react';
import { TextStyle, ViewStyle, Text } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import AppTouchable from './AppTouchable';

interface AppButtonProps {
  title: string;
  type: 'primary' | 'secondary';
  style?: ViewStyle;
  onPress(): void;
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const buttonStyle: ViewStyle = {
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: props.type === 'primary' ? Colors.Secondary : 'white',
    ...(props.style ?? {}),
  };
  const textStyle: TextStyle = {
    fontFamily: Fonts.NunitoSemiBold,
    color: props.type === 'primary' ? 'white' : Colors.Primary,
  };

  return (
    <AppTouchable contentContainerStyle={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </AppTouchable>
  );
};

export default AppButton;
