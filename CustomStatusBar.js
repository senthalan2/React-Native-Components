import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIos} from '../Utilities/Constants';

const CustomStatusBar = ({
  barBackgroundColor = '#0000000F',
  isContentLight = false,
}) => {
  const topInset = useSafeAreaInsets().top;
  return (
    <View
      style={[
        isIos
          ? {
              height: topInset > 0 ? topInset : 20,
              backgroundColor: barBackgroundColor,
            }
          : {
              height: StatusBar.currentHeight,
            },
      ]}>
      <StatusBar
        translucent
        backgroundColor={barBackgroundColor}
        barStyle={isContentLight ? 'light-content' : 'dark-content'}
      />
    </View>
  );
};
export default CustomStatusBar;
