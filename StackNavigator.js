import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import SignIn from './SignIn';
// import Dashboard from './Dashboard';
// import InvestmentDetail from './InvestmentDetail';
// import Investment from './AddInvestment';

const Stack = createStackNavigator();

function StackNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
