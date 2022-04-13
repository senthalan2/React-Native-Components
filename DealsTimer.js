import {StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {UBUNTU} from '../../Utilities/GlobalFonts';
import {SECONDARYCOLOR} from '../../Utilities/Colors';
import {useState} from 'react';

const DealsTimer = ({endTime, onEndTime}) => {
  const [dealEndTimer, setdealEndTimer] = useState('00:00:00:00');
  let intervalTimer;

  useEffect(() => {
    let end = moment(endTime).format('yyyy-MM-DD HH:mm:ss');
    let start = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');

    let finalEvent_date = new Date(end);
    let finalCurrent_date = new Date(start);

    intervalTimer = setInterval(() => {
      finalCurrent_date.setTime(finalCurrent_date.getTime() + 1000);
      if (
        moment(finalCurrent_date).isBefore(finalEvent_date)
        // moment(finalCurrent_date).isSame(finalEvent_date)
      ) {
        let diff = finalEvent_date.getTime() - finalCurrent_date.getTime();
        let Days = diff / (24 * 60 * 60 * 1000);
        let Hours = (diff / (60 * 60 * 1000)) % 24;
        let Minutes = (diff / (60 * 1000)) % 60;
        let Seconds = (diff / 1000) % 60;
        setdealEndTimer(
          (parseInt(Days) >= 10
            ? parseInt(Days)
            : '0' + parseInt(Days).toString()) +
            ':' +
            (parseInt(Hours) >= 10
              ? parseInt(Hours)
              : '0' + parseInt(Hours).toString()) +
            ':' +
            (parseInt(Minutes) >= 10
              ? parseInt(Minutes)
              : '0' + parseInt(Minutes).toString()) +
            ':' +
            (parseInt(Seconds) >= 10
              ? parseInt(Seconds)
              : '0' + parseInt(Seconds).toString()),
        );
      } else {
        clearInterval(intervalTimer);
        onEndTime();
      }
    }, 1000);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return <Text style={styles.timerText}>{dealEndTimer}</Text>;
};

export default DealsTimer;

const styles = StyleSheet.create({
  timerText: {
    fontFamily: UBUNTU[2],
    color: SECONDARYCOLOR,
    fontSize: 16,
    alignSelf: 'center',
  },
});
