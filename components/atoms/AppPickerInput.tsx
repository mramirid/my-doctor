import { Picker } from '@react-native-picker/picker';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReadonlyDeep } from 'type-fest';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

type Props = ReadonlyDeep<PickerProps & { label?: string; options: string[] }>;

export default function AppPickerInput(props: Props) {
  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          {...props}
          mode="dropdown"
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}>
          {props.options.map((option, i) => (
            <Picker.Item key={i} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </>
  );
}

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
  pickerItem: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
  },
});
