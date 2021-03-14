import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AppLogo from '../../assets/icons/AppLogo';
import AppButton from '../../components/atoms/AppButton';
import AppGap from '../../components/atoms/AppGap';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { GetStartedScreenNavProp } from '../../global-types/navigation';
import { selectSignInAsDoctor, toggleUserMode } from '../../store/reducers/user-mode';
import { useAppDispatch, useAppSelector } from '../../store/types';

const GetStartedScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GetStartedScreenNavProp>();

  const signInAsDoctor = useAppSelector(selectSignInAsDoctor);

  useEffect(() => {
    showMessage({
      message: signInAsDoctor ? 'Mode Dokter' : 'Mode Pasien',
      backgroundColor: signInAsDoctor ? Colors.Red : Colors.Green3,
      titleStyle: styles.flashMessageTitle,
    });
  }, [signInAsDoctor]);

  return (
    <ImageBackground
      style={styles.screen}
      source={require('../../assets/illustrations/get-started-bg.png')}>
      <View>
        <AppLogo color={signInAsDoctor ? Colors.Red : Colors.Green3} />
        <Text style={styles.text}>
          {signInAsDoctor
            ? 'Layani Konsultasi Pasien jadi lebih mudah & fleksibel'
            : 'Konsultasi dengan dokter jadi lebih mudah & fleksibel'}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.switchContainer}>
          <MaterialCommunityIcons
            name="account-switch-outline"
            size={28}
            color={Colors.White}
            onPress={() => dispatch(toggleUserMode())}
          />
        </TouchableOpacity>
        <AppGap height={16} />
        <AppButton
          title="Get Started"
          color="accent"
          onPress={() => {
            navigation.navigate(signInAsDoctor ? 'DoctorSignUpScreen' : 'PatientSignUpScreen');
          }}
        />
        <AppGap height={16} />
        <AppButton
          title="Sign In"
          color="flat"
          onPress={() => navigation.navigate('SignInScreen')}
        />
      </View>
      <StatusBar style="light" backgroundColor="transparent" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    paddingTop: 40 + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight),
    justifyContent: 'space-between',
  },
  switchContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.NunitoSemiBold,
    fontSize: 28,
    color: Colors.White,
    marginTop: 90,
  },
  flashMessageTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.NunitoSemiBold,
  },
});

export default GetStartedScreen;
