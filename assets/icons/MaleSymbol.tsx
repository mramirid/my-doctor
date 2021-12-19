import Svg, { Path, SvgProps } from 'react-native-svg';

export default function MaleSymbol(props: SvgProps) {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
      <Path
        d="M19 36c9.389 0 17-7.611 17-17S28.389 2 19 2 2 9.611 2 19s7.611 17 17 17z"
        fill="#0066CB"
        stroke="#fff"
        strokeWidth={4}
      />
      <Path
        d="M12.531 17.132a6.563 6.563 0 001.823 3.492 6.528 6.528 0 003.508 1.818v2.935l-.11-.311a1.714 1.714 0 00-.404-.639l-.404-.404a1.143 1.143 0 00-1.682.065 1.189 1.189 0 00.101 1.589l2.829 2.828c.446.447 1.17.446 1.616 0l2.83-2.83a1.183 1.183 0 00.171-1.512 1.143 1.143 0 00-1.754-.137l-.404.404a1.715 1.715 0 00-.413.663l-.085.32-.003-2.971a6.573 6.573 0 005.314-7.623 6.564 6.564 0 00-7.62-5.309 6.573 6.573 0 00-5.313 7.622zm9.505-4.19a4.287 4.287 0 01-.002 6.063 4.287 4.287 0 01-6.063.002 4.287 4.287 0 01.002-6.063 4.293 4.293 0 016.063-.002z"
        fill="#fff"
      />
    </Svg>
  );
}
