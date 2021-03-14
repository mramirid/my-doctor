import { Picker } from '@react-native-picker/picker';
import React, { ClassAttributes, forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { SelectOption } from '../../global-types/input';

type PickerProps = ConstructorParameters<typeof Picker>[0];

interface AppPickerInputProps extends PickerProps, ClassAttributes<Picker> {
  label?: string;
  options: SelectOption[];
}

const AppPickerInput = forwardRef<Picker, AppPickerInputProps>((props, ref) => (
  <>
    {props.label && <Text style={styles.label}>{props.label}</Text>}
    <View style={styles.pickerContainer}>
      <Picker
        {...props}
        style={styles.picker}
        ref={ref}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}>
        {props.options.map(({ key, value }) => (
          <Picker.Item key={key} label={value} value={value} />
        ))}
      </Picker>
    </View>
  </>
));

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
    color: Colors.Grey2,
  },
  pickerContainer: {
    maxHeight: 45,
    borderColor: Colors.Grey2,
    borderWidth: 1,
    borderRadius: 10,
  },
  picker: {
    height: 45,
  },
});

export default AppPickerInput;
