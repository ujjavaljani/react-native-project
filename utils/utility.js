import {AsyncStorage} from 'react-native';
export const _storeData = async storeData => {
  try {
    console.log('storing value', storeData);
    await AsyncStorage.setItem('userData', JSON.stringify(storeData));
  } catch (error) {
    // Error saving data
  }
};
export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    if (value !== null) {
      console.log('retrived value', value);
      return JSON.parse(value);
      // We have data!!
    } else {
      return {};
    }
  } catch (error) {
    // Error retrieving data
  }
};
