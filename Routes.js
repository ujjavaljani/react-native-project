import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Investment from './AddInvestment';
const Stack = createStackNavigator();
const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Investment"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Investment" component={Investment} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default Routes;
