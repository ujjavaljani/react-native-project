import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from './assets/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: Colors.white,
    fontSize: 22,
  },
});
export default Header;
