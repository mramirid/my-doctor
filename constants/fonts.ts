import { StyleSheet } from 'react-native';

enum Fonts {
  NunitoExtraLight = 'Nunito-ExtraLight', // 200
  NunitoLight = 'Nunito-Light', // 300
  NunitoRegular = 'Nunito-Regular', // 400
  NunitoSemiBold = 'Nunito-SemiBold', // 600
  NunitoBold = 'Nunito-Bold', // 700
  NunitoExtraBold = 'Nunito-ExtraBold', // 800
  NunitoBlack = 'Nunito-Black', // 900
}

export const fontStyles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.NunitoBold,
    fontSize: 18,
  },
  body: {
    fontFamily: Fonts.NunitoRegular,
  },
});

export default Fonts;
