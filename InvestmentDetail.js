import React, {useState, useCallback, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Share,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import Loader from './Loader';
import Header from './Header';
import Colors from './assets/colors';
import {useLinkProps} from '@react-navigation/native';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import colors from './assets/colors';
import RNShareFile from './Share';
// export const {RNShareFile} = NativeModules;
const InvestmentDetail = ({navigation, route}) => {
  const inputRef = useRef();
  const [imagePrev, setimg] = useState(null);
  //   const viewShot = useRef(null);
  //   let viewShot = React.createRef();
  const {
    name1,
    name2,
    name3,
    nomineeName,
    schemeType,
    maturityAmount,
    interestRate,
    depositeAmount,
    bankName,
    branch,
    depositeDate,
    maturityDate,
    familyId,
  } = route.params.investment;
  console.log('props detail', name1);
  console.log('imagePrev====', imagePrev);
  const formatDate = timestamp => {
    console.log('timestamp', timestamp);
    const d = new Date(Number(timestamp));
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  };

  const captureAndShareScreenshot = async () => {
    const storageGranted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    // const readStorageGranted = await PermissionsAndroid.request(

    // );
    // const granted = await PermissionsAndroid.request(

    // );

    console.log('imagePrev', imagePrev);

    inputRef.current.capture().then(async uri => {
      // await RNShareFile.share(uri, 'investment.png');
      // setimg({uri});
      RNFS.readFile(uri, 'base64').then(async res => {
        let urlString = 'data:image/png;base64,' + res;
        setimg({uri: urlString});
        await RNShareFile.share(res, 'investment.png');
      });
      // let options = {
      //   title: 'Share Title',
      //   message: 'Share Message',
      //   url: uri,
      //   // type: 'image/png',
      // };
      // await Share.share(options)
      //   .then(shareRes => {
      //     console.log('share Res', shareRes);
      //   })
      //   .catch(err => {
      //     err && console.log('share err', err);
      //   });
      // RNFS.readFile(uri, 'base64').then(async res => {
      //   let urlString = 'data:image/png;base64,' + res;
      //   console.log('uri', urlString);

      // });
    });

    // inputRef.current.capture().then(uri => {
    //   RNFS.readFile(uri, 'base64').then(res => {
    //     let urlString = 'data:image/jpeg;base64,' + res;
    //     let options = {
    //       title: 'Share Title',
    //       message: 'Share Message',
    //       url: urlString,
    //       type: 'image/jpeg',
    //     };
    //     console.log('urlString', urlString);
    //     await Share.open(options)
    //       .then(res => {
    //         console.log(res);
    //       })
    //       .catch(err => {
    //         err && console.log(err);
    //       });
    //   });
    // });
  };
  return (
    <View style={styles.screenContainer}>
      <Header
        left={true}
        title="Investment Detail"
        right={true}
        rightType={'share'}
        leftHandler={() => navigation.navigate('Dashboard')}
        rightHandler={captureAndShareScreenshot}
      />
      <ScrollView>
        {/* <View style={styles.formContainer}> */}
        <ViewShot
          style={styles.formContainer}
          ref={inputRef}
          // options={{format: 'jpg', quality: 0.9}}
        >
          <View>
            {/* <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/user.png')}
                style={styles.userIcon}
              />
            </View> */}
            <View style={styles.textWrap}>
              <Text style={styles.label}>Depositer 1:</Text>
              <Text style={styles.textInput}>{name1}</Text>
            </View>
          </View>

          {name2 !== '' && (
            <View>
              {/* <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/user.png')}
                style={styles.userIcon}
              />
            </ViewShot> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Depositer 2:</Text>
                <Text style={styles.textInput}>{name2}</Text>
              </View>
            </View>
          )}
          {name3 !== '' && (
            <View>
              {/* <View style={styles.userIconCon}>
                <Image
                  source={require('./assets/images/user.png')}
                  style={styles.userIcon}
                />
              </View> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Depositer 3:</Text>
                <Text style={styles.textInput}>{name3}</Text>
              </View>
            </View>
          )}
          {nomineeName !== '' && (
            <View>
              {/* <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/user.png')}
                style={styles.userIcon}
              />
            </View> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Nominee:</Text>
                <Text style={styles.textInput}>{nomineeName}</Text>
              </View>
            </View>
          )}
          {bankName !== '' && (
            <View>
              {/* <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/bank.png')}
                style={styles.userIcon}
              />
            </View> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Bank:</Text>
                <Text style={styles.textInput}>{bankName}</Text>
              </View>
            </View>
          )}
          {branch !== '' && (
            <View>
              {/* <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/bank-location.png')}
                style={styles.userIcon}
              />
            </View> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Branch:</Text>
                <Text style={styles.textInput}>{branch}</Text>
              </View>
            </View>
          )}
          {depositeAmount !== '' && (
            <View>
              {/* <View style={styles.interestCon}>
              <Image
                source={require('./assets/images/rupees.png')}
                style={styles.interestIcon}
              />
            </View> */}
              <View style={styles.textWrap}>
                <Text style={styles.label}>Deposite Amount:</Text>
                <Text style={styles.textInput}>{depositeAmount}</Text>
              </View>
            </View>
          )}
          {(schemeType !== '' || interestRate !== '') && (
            <View>
              <View style={styles.textWrap}>
                {schemeType !== '' && (
                  <View style={styles.textWrap}>
                    <Text style={styles.label}>Scheme:</Text>
                    <Text style={styles.textInput}>{schemeType}</Text>
                  </View>
                )}
                {interestRate !== '' && (
                  <View style={styles.textWrap}>
                    <Text style={styles.label}>Interest:</Text>
                    <Text style={styles.textInput}>{`${interestRate}%`}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {depositeDate !== '' && (
            <View>
              <View style={styles.textWrap}>
                <Text style={styles.label}>Deposite date:</Text>
                <Text style={styles.textInput}>{formatDate(depositeDate)}</Text>
              </View>
            </View>
          )}
          {maturityDate !== '' && (
            <View>
              <View style={styles.textWrap}>
                <Text style={styles.label}>Maturity date:</Text>
                <Text style={styles.textInput}>{formatDate(maturityDate)}</Text>
              </View>
            </View>
          )}
          {maturityAmount !== '' && (
            <View>
              <View style={styles.textWrap}>
                <Text style={styles.label}>Maturity amount:</Text>
                <Text style={styles.textInput}>{maturityAmount}</Text>
              </View>
            </View>
          )}
          {familyId && (
            <View>
              <View style={styles.textWrap}>
                <Text style={styles.label}>Family name:</Text>
                <Text style={styles.textInput}>{familyId}</Text>
              </View>
            </View>
          )}
        </ViewShot>
        {imagePrev && (
          <Image
            fadeDuration={0}
            resizeMode="contain"
            style={styles.previewImage}
            source={imagePrev}
          />
        )}
        {/* </View> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  previewImage: {
    height: 200,
    backgroundColor: 'blue',
  },
  screenContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    // flexDirection: 'row',
  },
  userIconCon: {
    width: 50,
    height: 50,
    position: 'absolute',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: '50%',
    height: 30,
    // padding: 10,
    // borderWidth: 1,
  },
  textInput: {
    // borderBottomColor: Colors.primary,
    // borderBottomWidth: 1,
    fontSize: 22,
    height: 40,
    textAlignVertical: 'center',
    paddingStart: 5,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'gray',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
    // flexDirection: 'row',
  },
});
export default InvestmentDetail;
