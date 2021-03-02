import * as React from 'react';
import { TextStyle, ViewStyle, Text } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import Touchable from './Touchable';

interface ButtonProps {
  title: string;
  type: 'primary' | 'secondary';
  style?: ViewStyle;
  onPress(): void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const buttonStyle: ViewStyle = {
    height: 45,
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
    <Touchable contentContainerStyle={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </Touchable>
  );
};

export default Button;
