import * as React from 'react';
import { StyleSheet, TextInput, TextInputProps, Text } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AppTextInputProps extends TextInputProps, React.ClassAttributes<TextInput> {
  label: string;
}

const AppTextInput = React.forwardRef<TextInput, AppTextInputProps>((props, ref) => (
  <>
    <Text style={styles.label}>{props.label}</Text>
    <TextInput style={styles.input} {...props} ref={ref} />
  </>
));

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
    color: Colors.Grey1,
  },
  input: {
    height: 45,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.Grey1,
    borderRadius: 10,
  },
});

export default AppTextInput;
