import React, { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

type Props = Pick<ViewStyle, 'width' | 'height' | 'backgroundColor'>;

const AppGap: FC<Props> = (props) => <View style={props} />;

export default memo(AppGap);
