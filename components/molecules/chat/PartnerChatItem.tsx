import { format } from 'date-fns';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import { Chat } from '../../../types/chat';
import AppCard from '../../atoms/AppCard';

type Props = Readonly<{
  chat: Chat;
  photo: string | null;
  style?: StyleProp<ViewStyle>;
}>;

export default function PartnerChatItem(props: Props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        style={styles.avatar}
        source={
          props.photo
            ? { uri: props.photo }
            : require('../../../assets/illustrations/user-photo-null.png')
        }
      />
      <View>
        <AppCard style={styles.messageCard}>
          <Text style={styles.message}>{props.chat.content}</Text>
        </AppCard>
        <Text style={styles.timestamp}>{format(props.chat.timestamp, 'hh:mm a')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12,
  },
  messageCard: {
    padding: 12,
    paddingLeft: 18,
    backgroundColor: Colors.Green2,
    borderBottomLeftRadius: 0,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: Colors.White,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: Colors.Grey2,
    marginTop: 8,
  },
});
