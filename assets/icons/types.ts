/*
 * import { EMaskUnits } from 'react-native-svg';
 *
 * EMaskUnits.USER_SPACE_ON_USE  ---> ERROR: Cannot read property 'USER_SPACE_ON_USE' of undefined
 *
 * Waiting for this https://github.com/react-native-svg/react-native-svg/issues/1210
 */
export enum EMaskUnits {
  USER_SPACE_ON_USE = 'userSpaceOnUse',
  OBJECT_BOUNDING_BOX = 'objectBoundingBox',
}
