import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import Colors from './assets/colors';
const Loader = props => {
  return (
    // <View style={[styles.loaderWrap, !props.loading ? styles.hide : '']}>
    //   <View>
    //     <Image
    //       source={require('./assets/images/spinner.gif')}
    //       style={styles.loaderImg}
    //     />
    //   </View>
    // </View>
    <Modal transparent={true} visible={props.loading}>
      <View style={[styles.loaderWrap]}>
        <ActivityIndicator size="large" color={`${Colors.primary}`} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  loaderWrap: {
    // position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'white',
    // top: 0,
    // left: 0,
    // zIndex: 100,
    // height: '100%',
  },
});

export default Loader;
