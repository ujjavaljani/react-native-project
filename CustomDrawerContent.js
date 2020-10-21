import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from './assets/colors';
import {_retrieveData, _storeData, removeAuthData} from './utils/utility';
import {connect} from 'react-redux';
import {SET_LOGOUT} from './actionTypes';

const CustomDrawerContent = props => {
  const logoutUser = async () => {
    await removeAuthData();
    props.userLogout();
    props.navigation.navigate('Auth');
  };
  (async () => {
    const userData = await _retrieveData();
    console.log('userData in custom drawer', userData);
  })();
  return (
    <View>
      {/* <TouchableWithoutFeedback>
        <View style={[styles.menuContainer]}>
          <View style={styles.userIconCon}>
            <Image
              style={styles.userIcon}
              source={require('./assets/images/user.png')}
            />
          </View>
          <Text style={[styles.menuText, styles.iconSpace]}>Login User</Text>
        </View>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(props.navigation.navigate('Investment'));
        }}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>New Investment</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(props.navigation.navigate('Dashboard'));
        }}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Dashboard</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => logoutUser()}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    // backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  menuText: {
    color: colors.primary,
    fontSize: 18,
  },
  userIconCon: {
    width: 50,
    height: 49,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: '50%',
    height: 30,
    // borderWidth: 1,
  },
  iconSpace: {
    paddingLeft: 40,
  },
});
function mapStateToProps(state) {
  console.log('mapStateToProps in drawer===>', state.Auth);
  return {
    isLoggedIn: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userLogout: () => {
      console.log('called userLogout');
      dispatch({type: SET_LOGOUT});
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContent);
// export default CustomDrawerContent;
