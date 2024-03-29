import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppLogo from '../../assets/icons/AppLogo';
import AppButton from '../../components/atoms/AppButton';
import AppGap from '../../components/atoms/AppGap';
import Colors from '../../constants/colors';
import { AppStackParamList } from '../../navigation/AppStack';
import { selectSignInAsDoctor, toggleUserMode } from '../../store/reducers/user-mode';
import { useAppDispatch, useAppSelector } from '../../store/types';

type GetStartedScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export default function GetStartedScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GetStartedScreenNavProp>();

  const signInAsDoctor = useAppSelector(selectSignInAsDoctor);

  useEffect(() => {
    showMessage({
      message: signInAsDoctor ? 'Mode Dokter' : 'Mode Pasien',
      backgroundColor: signInAsDoctor ? Colors.Red : Colors.Green3,
      titleStyle: styles.flashMessageTitle,
      statusBarHeight: Constants.statusBarHeight,
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
}

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
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 28,
    color: Colors.White,
    marginTop: 90,
  },
  flashMessageTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Nunito_600SemiBold',
  },
});
