import React, {useState, useEffect, useCallback} from 'react';
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
import Loader from './Loader';
import {_retrieveData, _storeData} from './utils/utility';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: [],
      isLoading: false,
    };
  }
  inputHandler = (field, value) => {
    this.setState({[field]: value});
    // switch (field) {
    //   case 'username':
    //     setUsername(value);
    //     break;
    //   case 'password':
    //     setPassword(value);
    //     break;
    // }
  };
  login = () => {
    // Alert.alert(JSON.stringify({username, password}));
    // console.log('login', JSON.stringify(error));
    this.setState({isLoading: true});
    // setLoading(true);
    this.validateField(async () => {
      console.log('after validate', JSON.stringify(this.state.error));
      if (this.state.error.length === 0) {
        console.log('inside condition', JSON.stringify(this.state.error));
        // this.props.navigation.navigate('Dashboard');
        const userPref = await _retrieveData();
        userPref.isLoggedIn = true;
        await _storeData(userPref);
        this.props.navigation.navigate('Dashboard');
      }
      this.setState({isLoading: false});
    });
  };
  validateField = callback => {
    let errorArr = [];
    // const {username, password} = this.state;
    // if (!username || username.trim() === '') {
    //   errorArr.push('username');
    // }
    // if (!password || password.trim() === '') {
    //   errorArr.push('password');
    // }
    // console.log('errorArr', errorArr);
    this.setState({error: errorArr}, () => callback());
  };
  render() {
    return (
      <>
        <Loader loading={this.state.isLoading} />
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
                  style={[
                    styles.input,
                    this.state.error.includes('username') ? styles.invalid : '',
                  ]}
                  placeholder="Enter your username"
                  autoCompleteType="username"
                  onChangeText={this.inputHandler.bind(this, 'username')}
                  value={this.state.username}
                />
              </View>
              <View>
                <TextInput
                  style={[
                    styles.input,
                    this.state.error.includes('password') ? styles.invalid : '',
                  ]}
                  textContentType="password"
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  autoCompleteType="password"
                  onChangeText={this.inputHandler.bind(this, 'password')}
                  value={this.state.password}
                />
              </View>
              <View style={styles.signInButtonContainer}>
                <Button
                  color={Colors.primary}
                  title="Sign In"
                  onPress={this.login}
                />
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
      </>
    );
  }
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
  invalid: {
    borderBottomColor: 'red',
  },
});
export default SignIn;
