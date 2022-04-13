import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {setInsets} from '../Store/Actions/utilityAction';
import {STATUSBARCOLOR} from '../Utilities/Colors';
import {isIos} from '../Utilities/Constants';

const CustomStatusBar = ({
  barBackgroundColor = STATUSBARCOLOR,
  isContentLight = false,
}) => {
  const dispatch = useDispatch();
  const {top, bottom, left, right} = useSafeAreaInsets();

  useEffect(() => {
    dispatch(
      setInsets({
        top,
        bottom,
        right,
        left,
      }),
    );

    return () => {};
  }, []);

  return (
    <View
      style={[
        isIos
          ? {
              height: top > 0 ? top : 20,
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
