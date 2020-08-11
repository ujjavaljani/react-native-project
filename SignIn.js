import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
} from 'react-native';
import Colors from './assets/colors';
import Header from './Header';

function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function inputHandler(field, value) {
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }
  function login() {
    // Alert.alert(JSON.stringify({username, password}));
    navigation.push('Dashboard');
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.signInScreenContainer}>
        <Header title="Sign in" />
        <View style={styles.siginInFormContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.tinyLogo}
              source={require('./assets/images/logo.png')}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              autoCompleteType="username"
              onChangeText={inputHandler.bind(this, 'username')}
              value={username}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              textContentType="password"
              secureTextEntry={true}
              placeholder="Enter your password"
              autoCompleteType="password"
              onChangeText={inputHandler.bind(this, 'password')}
              value={password}
            />
          </View>
          <View style={styles.signInButtonContainer}>
            <Button color={Colors.primary} title="Sign In" onPress={login} />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            color={Colors.primary}
            style={styles.buttonText}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  signInScreenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    alignItems: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 120,
    backgroundColor: '#ffffff',
  },
  input: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  siginInFormContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
  },
  signInButtonContainer: {
    marginTop: 15,
    // color: 'red',
    // backgroundColor: '#000000',
  },
  signInButton: {
    // backgroundColor: Colors.primary,
    // color: 'red',
  },
  button: {
    // alignItems: 'center',
    // borderColor: Colors.primary,
    // borderWidth: 1,
    margin: 15,
  },
  buttonText: {
    // color: Colors.primary,
    fontSize: 25,
    padding: 10,
  },
});
export default SignIn;
