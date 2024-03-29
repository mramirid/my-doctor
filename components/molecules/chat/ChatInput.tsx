import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import Colors from '../../../constants/colors';
import AppCard from '../../atoms/AppCard';
import AppTextInput from '../../atoms/AppTextInput';
import SendButton from './SendButton';

type Props = Readonly<{
  partnerName: string;
  onSend(chatContent: string): void;
  disabled: boolean;
}>;

export default function ChatInput(props: Props) {
  const [chatContent, setChatContent] = useState('');

  const onChatSend = () => {
    props.onSend(chatContent);
    setChatContent('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <AppCard style={styles.inputContainer}>
        <AppTextInput
          style={styles.input}
          value={chatContent}
          onChangeText={setChatContent}
          autoCapitalize="sentences"
          placeholder={`Tulis pesan untuk ${props.partnerName.split(' ')[0]}`}
        />
      </AppCard>
      <SendButton disabled={chatContent.length === 0 || props.disabled} onPress={onChatSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: Colors.Grey1,
  },
  input: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 0,
    color: Colors.Grey2,
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    height: 45,
  },
});
