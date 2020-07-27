/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import Routes from './Routes';
AppRegistry.registerComponent(appName, () => Routes);
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
