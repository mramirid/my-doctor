import { View, ViewStyle } from 'react-native';

type Props = Pick<ViewStyle, 'width' | 'height' | 'backgroundColor'>;

export default function AppGap(props: Props) {
  return <View style={props} />;
}
