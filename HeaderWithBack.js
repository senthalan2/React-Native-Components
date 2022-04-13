import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import BackIcon from '../../Assets/Svgs/Icons/back.svg';
import MenuIcon from '../../Assets/Svgs/Icons/menu.svg';

import AddIcon from '../../Assets/Svgs/Icons/plus.svg';

import HeartIcon from '../../Assets/Svgs/Icons/heart_filled.svg';

import NotificationsIcon from '../../Assets/Svgs/Icons/notifications.svg';
import SupportAgentIcon from '../../Assets/Svgs/Icons/support_agent.svg';

import ShareIcon from '../../Assets/Svgs/Icons/share.svg';

import CartIcon from '../../Assets/Svgs/Icons/shopping_cart.svg';
import ExportIcon from '../../Assets/Svgs/Icons/export.svg';

import FilterIcon from '../../Assets/Svgs/Icons/filter_blue.svg';

import DeleteIcon from '../../Assets/Svgs/Icons/delete.svg';
import {
  BLACKCOLOR,
  BUTTONCOLOR,
  PRIMARYCOLOR,
  SECONDARYCOLOR,
  WHITECOLOR,
} from '../../Utilities/Colors';
import {windowWidth} from '../../Utilities/Constants';

import {ROBOTO, UBUNTU} from '../../Utilities/GlobalFonts';

const HeaderWithBack = ({
  title = '',
  navigation,
  bgColor = WHITECOLOR,
  setModal,
  isModal = false,
  paddingHorizontal = 0,
  paddingVertical = 10,
  enableMenu = false,
  enableNotification = false,
  enableAgent = false,
  enableFilter = false,
  enableCart = false,
  enableShare = false,
  enableDelete = false,
  handleBackInside = true,
  enableBack = true,
  enableTextButton = false,
  enableAdd = false,
  enableExport = false,
  enableWishList = false,
  buttonText = '',
  onPressFilter,
  onPressMenu,
  onPressNotification,
  onPressAgent,
  onPressCart,
  onPressWishList,
  onPressShare,
  onPressDelete,
  onPressTextButton,
  onPressBackButton,
  onPressAddButton,
  onPressExportCSV,
  titleColor = SECONDARYCOLOR,
  backIconColor = SECONDARYCOLOR,
  buttonTextSize = 12,
  buttonTextColor = SECONDARYCOLOR,
}) => {
  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: bgColor,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
          },
        ]}>
        <View style={styles.BackButton}>
          {enableBack && (
            <TouchableOpacity
              onPress={() =>
                handleBackInside
                  ? isModal
                    ? setModal(false)
                    : navigation.goBack()
                  : onPressBackButton()
              }>
              {backIconColor === SECONDARYCOLOR ? (
                <BackIcon
                  height={20}
                  width={20}
                  fill={PRIMARYCOLOR}
                  fillSecondary={SECONDARYCOLOR}
                />
              ) : (
                <BackIcon
                  height={20}
                  width={20}
                  fill={PRIMARYCOLOR}
                  fillSecondary={backIconColor}
                />
              )}
            </TouchableOpacity>
          )}
          {enableMenu && (
            <TouchableOpacity
              style={{marginHorizontal: 10}}
              onPress={onPressMenu}>
              <MenuIcon
                height={24}
                width={24}
                fill={PRIMARYCOLOR}
                fillSecondary={SECONDARYCOLOR}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerTitleContainer}>
          <Text
            style={[
              styles.headerTitle,
              {color: titleColor, textAlign: 'center'},
            ]}>
            {title}
          </Text>
        </View>
        <View style={styles.headerButtons}>
          {enableNotification && (
            <TouchableOpacity onPress={onPressNotification}>
              <NotificationsIcon
                style={{marginHorizontal: 10}}
                fill={PRIMARYCOLOR}
                fillSecondary={SECONDARYCOLOR}
              />
            </TouchableOpacity>
          )}
          {enableAgent && (
            <TouchableOpacity onPress={onPressAgent}>
              <SupportAgentIcon
                fill={PRIMARYCOLOR}
                fillSecondary={SECONDARYCOLOR}
              />
            </TouchableOpacity>
          )}
          {enableFilter && (
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={onPressFilter}>
              <FilterIcon
                height={30}
                fill={PRIMARYCOLOR}
                fillSecondary={SECONDARYCOLOR}
              />
            </TouchableOpacity>
          )}
          {enableExport && (
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={onPressExportCSV}>
              <ExportIcon height={20} width={20} fill={SECONDARYCOLOR} />
            </TouchableOpacity>
          )}

          {enableAdd && (
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={onPressAddButton}>
              <AddIcon
                height={28}
                width={28}
                fill={SECONDARYCOLOR}
                fillSecondary={SECONDARYCOLOR}
              />
            </TouchableOpacity>
          )}
          {enableShare && (
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={onPressShare}>
              <ShareIcon fill={PRIMARYCOLOR} fillSecondary={SECONDARYCOLOR} />
            </TouchableOpacity>
          )}
          {enableCart && (
            <TouchableOpacity onPress={onPressCart}>
              <CartIcon fill={PRIMARYCOLOR} fillSecondary={SECONDARYCOLOR} />
            </TouchableOpacity>
          )}
          {enableWishList && (
            <TouchableOpacity onPress={onPressWishList}>
              <HeartIcon fill={PRIMARYCOLOR} fillSecondary={SECONDARYCOLOR} />
            </TouchableOpacity>
          )}
          {enableDelete && (
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={onPressDelete}>
              <DeleteIcon fill={WHITECOLOR} fillSecondary={WHITECOLOR} />
            </TouchableOpacity>
          )}
          {enableTextButton && (
            <TouchableOpacity
              style={{paddingTop: 3, alignItems: 'flex-end'}}
              onPress={onPressTextButton}>
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: 'right',
                    fontSize: buttonTextSize,
                    color: buttonTextColor,
                  },
                ]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BackButton: {
    width: (windowWidth - 50) / 3 - 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  headerTitleContainer: {
    width: (windowWidth - 50) / 3 + 100,
    alignItems: 'center',
    paddingVertical: 5,
  },
  headerButtons: {
    width: (windowWidth - 50) / 3 - 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerTitle: {fontFamily: UBUNTU[1], fontSize: 17},
  text: {
    width: 92,
    fontFamily: ROBOTO[0],
  },
  belowHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
    width: '100%',
    backgroundColor: WHITECOLOR,
    borderTopWidth: 1,
    borderTopColor: BUTTONCOLOR,

    justifyContent: 'space-between',
  },
});
