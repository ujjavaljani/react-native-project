import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Colors from './assets/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <View style={[styles.leftBtn, styles.leftRightBtn]}>
        {props.left && (
          <TouchableWithoutFeedback onPress={props.leftHandler}>
            <Text style={[styles.leftTxt, styles.leftRightTxt]}>Back</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
      <Text style={styles.headerText}>{props.title}</Text>
      <View style={[styles.rightBtn, styles.leftRightBtn]}>
        {props.right && (
          <TouchableWithoutFeedback onPress={props.rightHandler}>
            {props.rightType === 'share' ? (
              <Image
                source={require('./assets/images/share.png')}
                style={styles.userIcon}
              />
            ) : (
              // <Text style={[styles.rightTxt, styles.leftRightTxt]}>Share</Text>
              <Text style={[styles.rightTxt, styles.leftRightTxt]}>Add</Text>
            )}
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: '90%',
    height: 35,
    // padding: 10,
    // borderWidth: 1,
  },
  headerText: {
    color: Colors.white,
    fontSize: 22,
    textAlign: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    // height: '100%',
    flex: 1,
  },
  leftRightBtn: {paddingHorizontal: 10, width: 60},
  leftRightTxt: {color: Colors.white, fontSize: 17},
  leftBtn: {},
  rightBtn: {},
});
export default Header;
