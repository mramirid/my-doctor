import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet, Text, Image, FlatList } from 'react-native';

import AppTabScreen from '../../components/atoms/tab/AppTabScreen';
import ListItemBordered from '../../components/molecules/ListItemBordered';
import Colors from '../../constants/colors';
import DoctorSpecialist from '../../constants/doctor-specialist';
import doctors from '../../constants/dummies/doctors';
import Fonts from '../../constants/fonts';
import { MessagesScreenNavProp } from '../../global-types/navigation';
import withStatusBar from '../../hoc/withStatusBar';

const pedriaticians = doctors.filter(
  (doctor) => doctor.specialist === DoctorSpecialist.Pediatrician
);

const MessagesScreen: React.FC = () => {
  const navigation = useNavigation<MessagesScreenNavProp>();
  return (
    <AppTabScreen style={styles.screen}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={pedriaticians}
        style={styles.list}
        renderItem={({ item }) => (
          <ListItemBordered
            key={item.id}
            title={item.name}
            avatar={<Image style={styles.avatar} source={{ uri: item.photoUrl }} />}
            description="Baik ibu, terima kasih banyak atas wakt..."
            onPress={() => navigation.navigate('ChatRoomScreen', { doctor: item })}
          />
        )}
      />
    </AppTabScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Dark,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  list: {
    flex: 1,
  },
});

export default withStatusBar(MessagesScreen, 'dark', Colors.White);
