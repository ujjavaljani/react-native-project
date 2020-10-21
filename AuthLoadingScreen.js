import React from 'react';
import {_retrieveData} from './utils/utility';
import {connect} from 'react-redux';
import * as actionTypes from './actionTypes';
import Loader from './Loader';
import {View} from 'react-native';
function AuthLoadingScreen(props) {
  (async function() {
    // code
    console.log('called getUserPref in auth loading');
    const userPref = await _retrieveData();
    if (Object.keys(userPref).length) {
      console.log('userPref data in auhload', userPref);
      props.setUserPrefData(userPref);
      //   props.navigation.navigate('App');
    }
    props.navigation.navigate(userPref?.isLoggedIn ? 'App' : 'Auth');
  })();
  return (
    <View>
      <Loader loading={true} />
    </View>
  );
}
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setUserPrefData: data => {
      dispatch({type: actionTypes.SET_USERDATA, response: data});
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
