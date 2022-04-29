import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BLACKCOLOR,
  BUTTONCOLOR,
  PRIMARYCOLOR,
  SECONDARYCOLOR,
  WHITECOLOR,
} from '../Utilities/Colors';
import CloseIcon from '../Assets/Svgs/Icons/close.svg';

import KansasLogo from '../Assets/Svgs/Images/kansas_logo.svg';
import {UBUNTU} from '../Utilities/GlobalFonts';

const OtpConfirmation = () => {
  const [otpCode, setotpCode] = useState([]);

  const onChangeOtpCode = enteredDigit => {
    console.log('KKKK');
    let tempOtpCode = [...otpCode];
    tempOtpCode.push(enteredDigit);
    setotpCode(tempOtpCode);
  };
  const onRemoveOtpCode = () => {
    let tempOtpCode = [...otpCode];
    tempOtpCode.pop();
    setotpCode(tempOtpCode);
  };

  const renderNumberButtons = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item >= 0) {
            if (otpCode.length <= 5) {
              onChangeOtpCode(item);
            }
          } else if (item === -1) {
            onRemoveOtpCode();
          }
        }}
        onLongPress={() => {
          setotpCode([]);
        }}
        style={
          item !== -2
            ? [styles.itemContainer, {backgroundColor: BUTTONCOLOR}]
            : styles.emptyKeyPadDigit
        }>
        {item !== -2 ? (
          item !== -1 ? (
            <Text style={styles.numberItemText}>{item}</Text>
          ) : (
            <CloseIcon fillSecondary={SECONDARYCOLOR} height={20} />
          )
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.logoContainer}>
          <KansasLogo fill={PRIMARYCOLOR} height={'100%'} width={200} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, {color: PRIMARYCOLOR}]}>OTP </Text>
          <Text style={styles.titleText}> Verification</Text>
        </View>
        <View style={styles.textInputContainer}>
          {[...Array(6)].map((item, index) => {
            return (
              <View key={index.toString()} style={styles.otpSingleDigitBox}>
                <Text style={styles.otpText}>{otpCode[index]}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Don't receive the OTP? </Text>
          <TouchableOpacity>
            <Text style={[styles.footerText, {color: PRIMARYCOLOR}]}>
              RESEND OTP
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardContainer}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, -2, 0, -1]}
          numColumns={3}
          contentContainerStyle={{paddingVertical: 10}}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, width: 10}} />
          )}
          renderItem={renderNumberButtons}
        />
      </View>
    </View>
  );
};

export default OtpConfirmation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITECOLOR,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 130,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,

    flexDirection: 'row',
  },
  titleText: {
    fontFamily: UBUNTU[1],
    fontSize: 20,
    color: BLACKCOLOR,
  },
  textInputContainer: {
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderWidth: 1,
    // borderColor: BLACKCOLOR,
  },
  otpSingleDigitBox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BUTTONCOLOR,
    backgroundColor: WHITECOLOR,
    height: 45,
    width: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  otpText: {
    fontFamily: UBUNTU[1],
    color: BLACKCOLOR,
    fontSize: 16,
  },
  footerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  footerText: {
    color: SECONDARYCOLOR,
    fontFamily: UBUNTU[1],
    fontSize: 14,
  },
  buttonText: {
    fontFamily: UBUNTU[1],
    fontSize: 14,
    color: WHITECOLOR,
  },
  buttonContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: PRIMARYCOLOR,
    paddingHorizontal: 80,
  },
  keyboardContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BUTTONCOLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  emptyKeyPadDigit: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '30%',
  },
  numberItemText: {
    fontFamily: UBUNTU[1],
    color: SECONDARYCOLOR,
    fontSize: 16,
  },
});
