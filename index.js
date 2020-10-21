/**
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore from './Store';
// import {_retrieveData} from './utils/utility';

let store;
store = configureStore();
// (async function() {

// })();
const RNRedux = () => {
  // const userPref = await _retrieveData();
  // console.log('user Pref in index', userPref);
  // store = configureStore(userPref.Auth);
  return (
    store && (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  );
};
AppRegistry.registerComponent(appName, () => RNRedux);
// const MyStack = () => {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Sign In"
//             component={SignIn}
//             options={{title: 'Welcome'}}
//           />
//           <Stack.Screen name="Dashboard" component={Dashboard} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };
// export default MyStack;
