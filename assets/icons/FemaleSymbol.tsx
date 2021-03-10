import React, { FC, memo } from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

const FemaleSymbol: FC<SvgProps> = (props) => (
  <Svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
    <Circle cx={19} cy={19} r={17} fill="#E06379" stroke="#fff" strokeWidth={4} />
    <Path
      d="M12.51 17.153a6.55 6.55 0 005.333 5.313l-.006 1.687-1.287.003a1.15 1.15 0 00-1.087 1.203 1.14 1.14 0 001.087 1.083l1.283.002.002 1.283c.047.63.597 1.1 1.228 1.05a1.15 1.15 0 001.054-1.054l.006-1.283 1.283-.006a1.15 1.15 0 001.147-1.147 1.14 1.14 0 00-1.143-1.143l-1.283.006.003-1.692c3.576-.644 5.962-4.064 5.33-7.638a6.551 6.551 0 00-7.62-5.305c-3.577.644-5.963 4.064-5.33 7.638zm9.525-4.204a4.292 4.292 0 01-.01 6.07 4.292 4.292 0 01-6.07.01 4.292 4.292 0 01.01-6.07 4.298 4.298 0 016.07-.01z"
      fill="#fff"
    />
  </Svg>
);

export default memo(FemaleSymbol);
