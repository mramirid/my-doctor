import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

import AppGap from '../components/atoms/AppGap';
import AppLogo from '../components/atoms/AppLogo';
import AppButton from '../components/atoms/clickables/AppButton';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { GetStartedScreenNavProp } from '../navigation/GetStartedStack/types';

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<GetStartedScreenNavProp>();
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.screen}
        source={require('../assets/illustrations/get-started-bg.png')}>
        <View>
          <AppLogo />
          <Text style={styles.text}>Konsultasi dengan dokter jadi lebih mudah &amp; fleksibel</Text>
        </View>
        <View>
          <AppButton
            title="Get Started"
            color="accent"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
          <AppGap height={16} />
          <AppButton
            title="Sign In"
            color="flat"
            onPress={() => navigation.navigate('SignInScreen')}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.NunitoSemiBold,
    fontSize: 28,
    color: Colors.White,
    marginTop: 90,
  },
});

export default GetStartedScreen;
