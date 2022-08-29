import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BLACKCOLOR,
  SECONDARYCOLOR,
  WHITECOLOR,
  BUTTONCOLOR,
  PRIMARYCOLOR,
} from '../Utilities/Colors';
import CloseIcon from '../Assets/Svgs/Icons/close.svg';
import {UBUNTU} from '../Utilities/GlobalFonts';
import {MONTHS, YEARS} from '../Utilities/Constants';

const ITEM_SIZE = 40;

const MonthYearPicker = ({
  setModal,
  onSelectDate,
  appliedMonthIndex,
  appliedYearIndex,
}) => {
  const monthScrollY = useRef(new Animated.Value(0)).current;
  const yearScrollY = useRef(new Animated.Value(0)).current;

  const [selectedMonthIndex, setselectedMonthIndex] =
    useState(appliedMonthIndex);
  const [selectedYearIndex, setselectedYearIndex] = useState(appliedYearIndex);
  const monthsListRef = useRef(null);
  const yearsListRef = useRef(null);

  useEffect(() => {
    monthsListRef.current?.scrollToOffset({
      offset: selectedMonthIndex * (ITEM_SIZE + 10),
      animated: true,
    });
    yearsListRef.current?.scrollToOffset({
      offset: selectedYearIndex * (ITEM_SIZE + 10),
      animated: true,
    });
  }, []);

  const renderMonths = ({item, index}) => {
    const inputRange = [
      (index - 1) * (ITEM_SIZE + 10),
      index * (ITEM_SIZE + 10),
      (index + 1) * (ITEM_SIZE + 10),
    ];

    const opacity = monthScrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const scale = monthScrollY.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
    });

    return (
      <Animated.View
        style={{
          height: ITEM_SIZE,
          alignItems: 'center',
          backgroundColor: BUTTONCOLOR,
          justifyContent: 'center',
          borderRadius: 10,
          opacity,
          transform: [{scale}],
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          marginHorizontal: 1,
          elevation: 2,
        }}>
        <Animated.Text
          style={{
            fontFamily: UBUNTU[0],
            fontSize: 14,

            color: BLACKCOLOR,
          }}>
          {item}
        </Animated.Text>
      </Animated.View>
    );
  };

  const renderYears = ({item, index}) => {
    const inputRange = [
      (index - 1) * (ITEM_SIZE + 10),
      index * (ITEM_SIZE + 10),
      (index + 1) * (ITEM_SIZE + 10),
    ];

    const opacity = yearScrollY.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    const scale = yearScrollY.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
    });

    return (
      <Animated.View
        style={{
          height: ITEM_SIZE,
          alignItems: 'center',
          backgroundColor: BUTTONCOLOR,
          justifyContent: 'center',
          borderRadius: 10,
          opacity,
          transform: [{scale}],
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          marginHorizontal: 1,
          elevation: 2,
        }}>
        <Animated.Text
          style={{
            fontFamily: UBUNTU[0],
            fontSize: 14,
            color: BLACKCOLOR,
          }}>
          {item}
        </Animated.Text>
      </Animated.View>
    );
  };

  function Months() {
    return (
      <View
        style={{
          height: ITEM_SIZE * 4 + 30,
          width: '40%',
          justifyContent: 'center',
        }}>
        <Animated.FlatList
          ref={monthsListRef}
          data={MONTHS}
          renderItem={renderMonths}
          snapToInterval={ITEM_SIZE + 10}
          pagingEnabled
          onMomentumScrollEnd={event => {
            const currentMonthIndex = Math.round(
              event.nativeEvent.contentOffset.y / (ITEM_SIZE + 10),
            );
            setselectedMonthIndex(currentMonthIndex);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: monthScrollY},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{paddingVertical: ITEM_SIZE + 35}}
          style={{flexGrow: 0}}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  function Years() {
    return (
      <View
        style={{
          height: ITEM_SIZE * 4 + 30,
          width: '40%',
          justifyContent: 'center',
        }}>
        <Animated.FlatList
          ref={yearsListRef}
          data={YEARS}
          renderItem={renderYears}
          snapToInterval={ITEM_SIZE + 10}
          pagingEnabled
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: yearScrollY},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          onMomentumScrollEnd={event => {
            const currentIndex = Math.round(
              event.nativeEvent.contentOffset.y / (ITEM_SIZE + 10),
            );
            setselectedYearIndex(currentIndex);
          }}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{paddingVertical: ITEM_SIZE + 35}}
          style={{flexGrow: 0}}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Select Month and Year</Text>
          <TouchableOpacity
            style={styles.closeiconcontainer}
            onPress={() => setModal(false)}>
            <CloseIcon fillSecondary={SECONDARYCOLOR} height={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: ITEM_SIZE * 4 + 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {Months()}
          {Years()}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSelectDate(selectedMonthIndex, selectedYearIndex);
          }}>
          <Text style={styles.buttonLabel}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  subContainer: {
    backgroundColor: WHITECOLOR,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 15,
    // flex: 0.8,
  },
  closeiconcontainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  heading: {
    fontFamily: UBUNTU[1],
    fontSize: 17,
    color: SECONDARYCOLOR,
    alignSelf: 'center',
    maxWidth: '70%',
    textAlign: 'center',
  },
  headercontainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: UBUNTU[1],
    color: WHITECOLOR,
  },
});
