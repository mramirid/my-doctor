import React, { ClassAttributes, forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AppTextInputProps extends TextInputProps, ClassAttributes<TextInput> {
  label?: string;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>((props, ref) => {
  const [borderColor, setBorderColor] = useState(Colors.Grey2);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onFocus) props.onFocus(e);
    setBorderColor(Colors.Blue);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.onBlur) props.onBlur(e);
    setBorderColor(Colors.Grey2);
  };

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={{
          ...styles.input,
          ...((props.style ?? {}) as TextStyle),
          borderColor,
        }}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
    color: Colors.Grey2,
  },
  input: {
    height: 45,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
  },
});

export default AppTextInput;
