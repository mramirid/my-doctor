import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import AppCard from '../../atoms/AppCard';
import AppTextInput from '../../atoms/AppTextInput';
import SendButton from './SendButton';

interface ChatInputProps {
  partnerName: string;
  onSend(chatContent: string): void;
  disabled: boolean;
  styles?: ViewStyle;
}

const ChatInput: FC<ChatInputProps> = (props) => {
  const [chatContent, setChatContent] = useState('');

  const onChatSend = useCallback(() => {
    props.onSend(chatContent);
    setChatContent('');
  }, [chatContent, props]);

  return (
    <View style={{ ...styles.container, ...(props.styles ?? {}) }}>
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
};

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
    fontFamily: Fonts.NunitoRegular,
    fontSize: 14,
    height: 45,
  },
});

export default ChatInput;
