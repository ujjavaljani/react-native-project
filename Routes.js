import React, {useState} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';

// import {
//   createStackNavigator,
//   CardStyleInterpolators,
//   TransitionPresets,
// } from '@react-navigation/stack';
// import SignIn from './SignIn';
// import Dashboard from './Dashboard';
// import Investment from './AddInvestment';
// import InvestmentDetail from './InvestmentDetail';
import Drawer from './Drawer';
import {_retrieveData} from './utils/utility';
import StackNavigator from './StackNavigator';
import DrawerNavigator from './Drawer';
import AuthLoadingScreen from './AuthLoadingScreen';
// import StackNavigator from './StackNavigator';
// const Stack = createStackNavigator();
const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: StackNavigator,
    App: DrawerNavigator,
  },
  {
    backBehavior: 'none',
    defaultNavigationOptions: {header: null},
  },
);
const Routes = props => {
  // const [isLoggedIn, setIsloggedIn] = useState(false);

  // (async function() {
  //   // code
  //   console.log('called getUserPref in routes');
  //   const userPref = await _retrieveData();
  //   console.log('userPref data in routes', userPref);
  //   // setIsloggedIn(userPref.isLoggedIn);
  // })();
  // console.log('props in route', props);
  // const getUserPref = async () => {
  // };
  // getUserPref();
  return (
    <>
      <NavigationContainer>
        {/* <StackNavigator /> */}
        <SwitchNav />
        {/* {!props.isLoggedIn && <StackNavigator isLoggedIn={props.isLoggedIn} />}
        {props.isLoggedIn && <Drawer isLoggedIn={props.isLoggedIn} />} */}
        {/* <Stack.Navigator
          // initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Investment" component={Investment} />
          <Stack.Screen name="InvestmentDetail" component={InvestmentDetail} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
};
function mapStateToProps(state) {
  return {
    isLoggedIn: state.Auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
// export default Routes;
