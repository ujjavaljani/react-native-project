import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import StackNavigator from './StackNavigator';
// import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Investment from './AddInvestment';
import InvestmentDetail from './InvestmentDetail';
// import ScreenShot from './ScreenShot';
import colors from './assets/colors';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      initialRouteName={'Dashboard'}
      drawerContent={() => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
      }}>
      {/* <StackNavigator /> */}
      <Drawer.Screen
        style={styles.drawerScreen}
        name="Dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        style={styles.drawerScreen}
        name="Investment"
        component={Investment}
      />
      {/* <Drawer.Screen
        style={styles.drawerScreen}
        name="CaptureDemo"
        component={ScreenShot}
      /> */}
      <Drawer.Screen
        name="InvestmentDetail"
        component={InvestmentDetail}
        options={{
          drawerLabel: () => null,
        }}
      />
      {/* <Drawer.Screen name="login" component={StackNavigator} /> */}
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.white,
    width: 240,

    // drawerBackgroundColor: colors.primary,
  },
  drawerScreen: {},
});
export default MyDrawer;
