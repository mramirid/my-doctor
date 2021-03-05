import { useTypedController } from '@hookform/strictly-typed';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Doctor from '../../global-types/doctor';
import AppCard from '../atoms/AppCard';
import AppTextInput from '../atoms/AppTextInput';
import AppButton from '../atoms/clickables/AppButton';

interface FormValues {
  message: string;
}

interface ChatInputProps {
  doctor: Doctor;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const { control } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  return (
    <View style={styles.container}>
      <AppCard style={styles.inputContainer}>
        <TypedController
          name="message"
          defaultValue=""
          rules={{ required: true }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              style={styles.input}
              autoCapitalize="sentences"
              returnKeyType="done"
              placeholder={`Tulis pesan untuk ${props.doctor.name.split(' ')[0]}`}
            />
          )}
        />
      </AppCard>
      <AppButton title="Send" color="primary" onPress={() => null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    padding: 14,
    backgroundColor: Colors.Grey1,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0,
    fontFamily: Fonts.NunitoRegular,
    fontSize: 14,
    color: Colors.Grey2,
  },
});

export default ChatInput;
