import React, {useState} from 'react';
import {
  NavigationContainer,
  createSwitchNavigator,
} from '@react-navigation/native';
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
// import StackNavigator from './StackNavigator';
// const Stack = createStackNavigator();
const Routes = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  (async function() {
    // code
    console.log('called getUserPref');
    const userPref = await _retrieveData();
    setIsloggedIn(userPref.isLoggedIn);
  })();
  // const getUserPref = async () => {
  // };
  // getUserPref();
  return (
    <>
      <NavigationContainer>
        {/* <StackNavigator /> */}
        {isLoggedIn && <Drawer isLoggedIn={isLoggedIn} />}
        {!isLoggedIn && <StackNavigator isLoggedIn={isLoggedIn} />}
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
export default Routes;
