import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Colors from './assets/colors';
const AutocompleteSearch = props => {
  const [searchedText, setSearchedText] = useState('');
  return (
    <View>
      <TextInput
        onChangeText={text => setSearchedText(text)}
        value={searchedText}
      />
    </View>
  );
};
export default AutocompleteSearch;
