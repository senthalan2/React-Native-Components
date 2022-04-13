import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PatternLockScreen from '../../../Components/PatternLock/PatternLockScreen';
import HeaderWithBack from '../../../Components/Header/HeaderWithBack';
import {
  PRIMARYCOLOR,
  SECONDARYCOLOR,
  WHITECOLOR,
} from '../../../Utilities/Colors';
import {useDispatch, useSelector} from 'react-redux';

import {SALT_KEY} from '../../../Services/ServiceConstants';

import sha1 from 'sha1';
import {logoutService, updateLoginPattern} from '../../../Services/ApiService';
import {
  setisAppUnlocked,
  setVersionResponse,
} from '../../../Store/Actions/authAction';
import CloseIcon from '../../../Assets/Svgs/Icons/close.svg';
import DialogueBox from '../../../Modals/DialogueBox';
import LoadingScreen from '../../../Modals/LoadingScreen';
import {removeToken} from '../../../Utilities/Methods';
import {getCorrectPatterninArray} from '../../../Components/PatternLock/Helpers';
import {getCorrectPatterninString} from '../../../Components/PatternLock/Helpers/getCorrectPatterninString';
import {UBUNTU} from '../../../Utilities/GlobalFonts';

const {width, height} = Dimensions.get('window');
const PATTERN_CONTAINER_HEIGHT = height / 2;
const PATTERN_CONTAINER_WIDTH = width;
const PATTERN_DIMENSION = 3;

const PatternLockAuthentication = ({navigation}) => {
  const dispatch = useDispatch();

  const versionResponse = useSelector(state => state.auth.versionResponse);
  const userToken = useSelector(state => state.auth.userToken);
  const [openErrorBox, setopenErrorBox] = useState(false);
  const [errorBoxData, seterrorBoxData] = useState({});

  let logoutTimer;

  const [loaderData, setloaderData] = useState({
    text: 'Updating Pattern',
    description: 'Processing',
  });

  const [isLoading, setisLoading] = useState(false);
  const CORRECT_UNLOCK_PATTERN = getCorrectPatterninArray(
    versionResponse.login_pattern,
  );

  useEffect(() => {
    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);

  const changePatternApiCall = pattern => {
    let formData = new FormData();
    let authcode = sha1(SALT_KEY + userToken);
    formData.append('authcode', authcode);
    formData.append('token', userToken);
    formData.append('pattern', pattern);
    updateLoginPattern(formData)
      .then(res => {
        if (res.data.status === 1) {
          let updatedDetails = {...versionResponse, login_pattern: pattern};
          dispatch(setVersionResponse(updatedDetails));
        } else if (res.data.status === 0) {
          seterrorBoxData({
            text: res.data.msg,
            icon: CloseIcon,
          });
          setopenErrorBox(true);
        }
      })
      .catch(e => {
        seterrorBoxData({
          text: e.message,
          icon: CloseIcon,
        });
        setopenErrorBox(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const logoutAPICall = () => {
    let formData = new FormData();
    let authcode = sha1(SALT_KEY + userToken);
    formData.append('authcode', authcode);
    formData.append('token', userToken);
    logoutService(formData)
      .then(response => {
        if (response.data.status === 1) {
          removeToken(dispatch);
        } else if (response.data.status == 0) {
          seterrorBoxData({
            text: response.data.msg,
            icon: CloseIcon,
          });
          setopenErrorBox(true);
        }
      })
      .catch(e => {
        seterrorBoxData({
          text: e.message,
          icon: CloseIcon,
        });
        setopenErrorBox(true);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const onPatternMatch = pattern => {
    if (CORRECT_UNLOCK_PATTERN.length) {
      dispatch(setisAppUnlocked(true));

      // navigation.replace('TabNavigation');
    } else {
      setloaderData({
        text: 'Updating Pattern...',
        description: 'Processing',
      });
      setisLoading(true);
      changePatternApiCall(getCorrectPatterninString(pattern));
    }
  };
  const onWrongPattern = (pattern, remainingAttempts) => {
    if (remainingAttempts === 0) {
      setloaderData({
        text: 'Logging Out...',
        description: 'Too many Attempts...',
      });
      setisLoading(true);

      logoutTimer = setTimeout(() => {
        logoutAPICall();
        clearTimeout(logoutTimer);
      }, 1000);
    }
  };

  const onCloseDialogue = () => {
    setopenErrorBox(false);
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderWithBack
        title="Pattern Lock"
        titleColor={SECONDARYCOLOR}
        enableBack={false}
      />

      <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
        <PatternLockScreen
          containerDimension={PATTERN_DIMENSION}
          containerWidth={PATTERN_CONTAINER_WIDTH}
          containerHeight={PATTERN_CONTAINER_HEIGHT}
          correctPattern={CORRECT_UNLOCK_PATTERN}
          processName={
            CORRECT_UNLOCK_PATTERN.length ? 'confirm_pattern' : 'set_pattern'
          }
          isChangePattern={false}
          onPatternMatch={onPatternMatch}
          onWrongPattern={onWrongPattern}
        />
      </View>
      <View style={{flex: 0.2}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.replace('Fingerprint');
          }}>
          <Text style={styles.buttonText}>UNLOCK WITH YOUR FINGERPRINT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'center', padding: 5}}>
          <Text style={[styles.text, {fontSize: 12}]}>Forgot Pattern?</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isLoading} transparent={true} onRequestClose={() => {}}>
        <LoadingScreen
          text={loaderData.text}
          description={loaderData.description}
        />
      </Modal>

      <Modal
        visible={openErrorBox}
        transparent={true}
        onRequestClose={() => {
          onCloseDialogue();
        }}>
        <DialogueBox data={errorBoxData} handlePressOk={onCloseDialogue} />
      </Modal>
    </View>
  );
};

export default PatternLockAuthentication;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: WHITECOLOR,
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 23,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 21,
  },
  buttonText: {
    color: '#fff',
    fontFamily: UBUNTU[2],
  },
  text: {
    fontFamily: UBUNTU[0],
    color: SECONDARYCOLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
