import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import Colors from './assets/colors';
import {Picker} from '@react-native-community/picker';
const AutocompleteSearch = props => {
  const [searchedText, setSearchedText] = useState('');
  const [familyId, setFamily] = useState(0);
  return (
    <View>
      <View>
        {/* <Text style={labelStyle}>First Depositer Name</Text> */}
        <View style={styles.userIconCon}>
          <Image
            source={require('./assets/images/user-search.png')}
            style={styles.userIcon}
          />
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Search family group name"
          value={searchedText}
          onChangeText={text => setSearchedText(text)}
        />
      </View>
      <Picker
        testID="Scheme"
        selectedValue={familyId}
        //   style={{height: 50, width: 150}}
        style={styles.schemePicker}
        // prompt={false}
        // onValueChange={this.inputHandler.bind(this, 'family')}
      >
        {props.data.map((group, index) => {
          // console.log('index', index);
          return (
            <Picker.Item
              itemStyle={styles.schemeItem}
              key={index}
              label={group.name}
              value={group.id}
              prompt={false}
            />
          );
        })}
      </Picker>
      {/* {props.data.map(() => {
          return ()
      })} */}
    </View>
  );
};
const styles = StyleSheet.create({
  userIconCon: {
    width: 50,
    height: 49,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: '50%',
    height: 30,
    // borderWidth: 1,
  },
  textInput: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    fontSize: 18,
    paddingStart: 50,
    // backgroundColor: 'darkgray',
  },
});
export default AutocompleteSearch;
