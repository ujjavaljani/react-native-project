import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import API from './network';
export const _storeData = async storeData => {
  try {
    // console.log('storing value', storeData);
    await AsyncStorage.setItem('userData', JSON.stringify(storeData));
  } catch (error) {
    // Error saving data
    console.log('error in storing user pref data', error);
  }
};
export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    console.log('inside utils async value====', value);
    if (value !== null) {
      // console.log('retrived value', value);
      return JSON.parse(value);
      // We have data!!
    } else {
      return {};
    }
  } catch (error) {
    console.log('error in retriving user pref data', error);
    // Error retrieving data
  }
};

export const storeAuthData = async data => {
  let userPref = {};
  userPref.isLoggedIn = true;
  userPref.authData = data;
  await _storeData(userPref);
  return true;
};
export const removeAuthData = async () => {
  let userPref = {};
  userPref.isLoggedIn = false;
  userPref.authData = null;
  await _storeData(userPref);
  return true;
};
export const imageUpload = async imageData => {
  // const requestOptions = {
  // method: 'POST',
  // headers: {'Content-Type': 'multipart/form-data'},
  // headers: {'Content-Type': 'application/json'},
  // body: imageData,
  const requestOptions = {
    file: imageData,
    upload_preset: 'certificate',
    // folder: 'investmentApp',
    // unique_filename: true,
    // type: 'authenticated',
    // resource_type: 'image',
    // api_key: '245738536474931',
    // access_control: {auth_token: {key: '245738536474931', duration: 3000}},
  };
  // };
  return await API(
    'POST',
    'https://api.cloudinary.com/v1_1/urimages/upload',
    requestOptions,
  );
  // return await axios
  //   .post('https://api.cloudinary.com/v1_1/urimages/upload', requestOptions)
  //   .then(function(response) {
  //     // console.log('response', response);
  //     return response;
  //   })
  //   .catch(function(error) {
  //     console.log('error', error);
  //     throw error;
  //   });
};
