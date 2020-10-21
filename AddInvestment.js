import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './Header';
import Colors from './assets/colors';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fetchRecords, addRecord} from './utils/dbOperations';
import AutoCompleteSearch from './AutoCompleteSearch';
import Loader from './Loader';
import ImagePicker from 'react-native-image-picker';
import {imageUpload} from './utils/utility';
import colors from './assets/colors';
import dayjs from 'dayjs';
const schemes = ['RD', 'MIS', 'KVP', 'TD', 'Bank FD'];
const years = [...Array(11).keys()];
const months = [...Array(13).keys()];
const days = [...Array(32).keys()];
const familyList = [
  {
    familyId: 1,
    name: 'Ramesh Jani',
  },
  {
    familyId: 2,
    name: 'Daxa Jani',
  },
  {
    familyId: 3,
    name: 'V.G.Dixit',
  },
  {
    familyId: 4,
    name: 'Dilip Soni',
  },
  {
    familyId: 5,
    name: 'Kalidas Patel',
  },
];
class AddInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    this.state = {
      depositer: {
        depositer1: '',
        depositer2: '',
        depositer3: '',
      },
      nominee: '',
      bankName: '',
      branchName: '',
      scheme: schemes[0],
      depositeDate: '',
      maturityDate: '',
      tenure: {years: null, months: null, days: null},
      datepickerVisibility: false,
      depositeAmount: 0,
      interestRate: 0,
      maturityAmount: 0,
      datePickerVisibilityFor: '',
      error: [],
      isLoading: false,
      accountNo: '',
      photos: [],
      frontAvatarSource: '',
      backAvatarSource: '',
      //   isFocused:false
    };
    // console.log('Process', process.env);
  }

  componentDidMount() {
    // addRecord();
    fetchRecords();
  }
  //   console.log('years', years);
  inputHandler(field, value) {
    // console.log('field', field);
    // console.log('value', value);
    let stateData = {[field]: value};
    switch (field) {
      case 'depositer1':
      case 'depositer2':
      case 'depositer3':
        stateData = {
          depositer: {...this.state.depositer, [field]: value},
        };
        break;
      //   case 'nominee':
      //     stateData=value;
      //     break;
      //   case 'bankName':
      //     setBank(value);
      //     break;
      //   case 'branchName':
      //     setBranch(value);
      //     break;
      //   case 'scheme':
      //     setScheme(value);
      //     break;
      //   case 'depositeDate':
      //     setDepositeDate(value);
      //     break;
      case 'years':
      case 'months':
      case 'days':
        stateData = {tenure: {...this.state.tenure, [field]: value}};
        const maturityDate = this.calculateMaturityDate(stateData);
        stateData = {...stateData, maturityDate: maturityDate};
        // setTenure({...tenure, [field]: value});
        break;
    }
    this.setState(stateData);
  }
  datepickerChange(field, event) {
    // console.log('datepicker change', event);
    // console.log('datepicker field', field);
    switch (event.type) {
      case 'dismissed':
        this.setDatepickerVisibility(false, this.state.datePickerVisibilityFor);
        break;
      case 'set':
        this.setDatepickerVisibility(
          false,
          this.state.datePickerVisibilityFor,
          true,
          event.nativeEvent.timestamp,
        );
        // this.setDepositeDate(event.nativeEvent.timestamp);
        break;
      default:
        this.setDatepickerVisibility(false, this.state.datePickerVisibilityFor);
        break;
    }
  }
  calculateMaturityDate = ({tenure}) => {
    let expectedMaturityDate = this.state.depositeDate;
    console.log('depositeDate', expectedMaturityDate, tenure);
    if (expectedMaturityDate) {
      // let years = parseInt(depositeDate.getFullYear());
      // let months = parseInt(depositeDate.getMonth());
      // let days = parseInt(depositeDate.getDate());
      if (tenure.years) {
        expectedMaturityDate = dayjs(expectedMaturityDate)
          .add(tenure.years, 'year')
          .valueOf();
      }
      if (tenure.months) {
        expectedMaturityDate = dayjs(expectedMaturityDate)
          .add(tenure.months, 'month')
          .valueOf();
      }
      if (tenure.days) {
        expectedMaturityDate = dayjs(expectedMaturityDate)
          .add(tenure.days, 'day')
          .valueOf();
      }
      console.log('maturity===', expectedMaturityDate);
      return expectedMaturityDate;
      // return dayjs(expectedMaturityDate);
    }
  };
  setDatepickerVisibility = (visibility, field, valueChanged, date) => {
    // console.log('visibility', visibility);
    // console.log('visibility for field', field);
    const dateObj = {
      datepickerVisibility: visibility,
      datePickerVisibilityFor: field,
    };
    if (valueChanged) {
      dateObj[this.state.datePickerVisibilityFor] = date;
    }
    // console.log('dateObj', dateObj);
    this.setState(dateObj);
  };
  dateFormat(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
  }
  submitInvestment = () => {
    this.setState({isLoading: true});
    this.validateFields(async () => {
      if (this.state.error.length === 0) {
        // console.log('form submit===>', this.state);
        // const investmentData = this.state;
        try {
          let frontUrl = '',
            backUrl = '';
          if (this.state.frontAvatarSource !== '') {
            const response = await imageUpload(
              this.state.frontAvatarSource.base64Data,
            );

            // console.log('frontUrl', response.data.secure_url);
            frontUrl = response.data.secure_url;
          }
          if (this.state.backAvatarSource !== '') {
            const response = await imageUpload(
              this.state.backAvatarSource.base64Data,
            );
            backUrl = response.data.secure_url;
          }
          const {
            datePickerVisibilityFor,
            datepickerVisibility,
            frontAvatarSource,
            backAvatarSource,
            ...investmentData
          } = this.state;
          investmentData.frontUrl = frontUrl;
          investmentData.backUrl = backUrl;
          // console.log('investmentData', investmentData);
          const newRecorsRes = await addRecord(investmentData);
          console.log('newRecorsRes', newRecorsRes);
        } catch (error) {
          console.log('inside add error', error);
          throw error;
        }
        // this.props.navigation.goBack();
        this.props.navigation.navigate('Dashboard');
      } else {
        console.log('Error in submit', this.state.error);
      }
      this.setState({isLoading: false});
    });
  };
  validateFields = callBack => {
    const {
      depositer: {depositer1},
      depositeAmount,
      depositeDate,
      maturityDate,
      interestRate,
      scheme,
      branchName,
      bankName,
      accountNo,
    } = this.state;
    let errorArr = [];
    // console.log('depositer1', depositer1);
    if (!accountNo || accountNo.trim() === '') {
      errorArr.push('accountNo');
    }
    if (!depositer1 || depositer1.trim() === '') {
      errorArr.push('depositer1');
    }
    if (!depositeAmount || depositeAmount < 1) {
      errorArr.push('depositeAmount');
    }
    if (depositeDate === '') {
      errorArr.push('depositeDate');
    }
    if (maturityDate === '') {
      errorArr.push('maturityDate');
    }
    if (maturityDate && maturityDate <= depositeDate) {
      errorArr.push('maturityDate');
    }
    if (!interestRate || interestRate.trim() === '') {
      errorArr.push('interestRate');
    }
    if (scheme === '') {
      errorArr.push('scheme');
    }
    if (!branchName || branchName.trim() === '') {
      errorArr.push('branchName');
    }
    if (!bankName || bankName.trim() === '') {
      errorArr.push('bankName');
    }
    this.setState({error: errorArr}, () => callBack());
  };

  openImagePicker = side => {
    ImagePicker.showImagePicker(this.options, async response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          base64Data: `data:${response.type};base64,${response.data}`,
        };
        this.setState({
          [side]: source,
        });
        // await imageUpload('data:image/jpeg;base64,' + response.data);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // var formData = new FormData();
        // formData.append('file', {
        //   uri: 'file://' + response.path,
        //   type: response.type,
        //   name: response.fileName,
        //   size: response.fileSize,
        // });
        // formData.append('upload_preset', 'certificate');
        // formData.append('resource_type', 'image');
        // formData.append('api_key', '245738536474931');
        // console.log('uri received===>', response.uri);
      }
    });
  };

  //   const labelStyle = {
  //     position: 'absolute',
  //     left: 50,
  //     top: !isFocused ? 12 : -2,
  //     fontSize: !isFocused ? 18 : 14,
  //     color: !isFocused ? '#aaa' : '#000',
  //   };
  render() {
    return (
      <>
        <Loader loading={this.state.isLoading} />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screenContainer}>
            <Header
              left={true}
              title="Add Investment"
              right={false}
              leftHandler={() => this.props.navigation.navigate('Dashboard')}
            />
            <ScrollView>
              <View style={styles.formContainer}>
                <View>
                  <TextInput
                    style={[
                      styles.textInputNoPad,
                      styles.name,
                      this.state.error.includes('accountNo')
                        ? styles.invalid
                        : '',
                    ]}
                    placeholder="Enter Account Number"
                    value={this.state.accountNo}
                    onChangeText={this.inputHandler.bind(this, 'accountNo')}
                  />
                </View>
                <View>
                  {/* <Text style={labelStyle}>First Depositer Name</Text> */}
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/user.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.name,
                      this.state.error.includes('depositer1')
                        ? styles.invalid
                        : '',
                    ]}
                    placeholder="Enter First Depositer Name"
                    value={this.state.depositer.depositer1}
                    onChangeText={this.inputHandler.bind(this, 'depositer1')}
                    // onFocus={() => this.manageInputFocus(true)}
                    // onBlur={() => this.manageInputFocus(false)}
                  />
                </View>
                <View>
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/user.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.name]}
                    placeholder="Enter Second Depositer Name"
                    value={this.state.depositer.depositer2}
                    onChangeText={this.inputHandler.bind(this, 'depositer2')}
                  />
                </View>
                <View>
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/user.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.name]}
                    placeholder="Enter Third Depositer Name"
                    value={this.state.depositer.depositer3}
                    onChangeText={this.inputHandler.bind(this, 'depositer3')}
                  />
                </View>
                <View>
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/user.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.name]}
                    placeholder="Enter Nominee Name"
                    value={this.state.nominee}
                    onChangeText={this.inputHandler.bind(this, 'nominee')}
                  />
                </View>
                <View>
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/bank.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.name,
                      this.state.error.includes('bankName')
                        ? styles.invalid
                        : '',
                    ]}
                    placeholder="Enter Bank Name"
                    value={this.state.bankName}
                    onChangeText={this.inputHandler.bind(this, 'bankName')}
                  />
                </View>
                <View>
                  <View style={styles.userIconCon}>
                    <Image
                      source={require('./assets/images/bank-location.png')}
                      style={styles.userIcon}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.name,
                      this.state.error.includes('branchName')
                        ? styles.invalid
                        : '',
                    ]}
                    placeholder="Enter Branch Name"
                    value={this.state.branchName}
                    onChangeText={this.inputHandler.bind(this, 'branchName')}
                  />
                </View>
                <View>
                  <View style={styles.interestCon}>
                    <Image
                      source={require('./assets/images/rupees.png')}
                      style={styles.interestIcon}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      styles.name,
                      this.state.error.includes('depositeAmount')
                        ? styles.invalid
                        : '',
                    ]}
                    placeholder="Investment Amount"
                    value={this.state.depositeAmount}
                    onChangeText={this.inputHandler.bind(
                      this,
                      'depositeAmount',
                    )}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.multipleElement}>
                  <View style={[styles.schemeContainer]}>
                    <Picker
                      testID="Scheme"
                      selectedValue={this.state.scheme}
                      //   style={{height: 50, width: 150}}
                      style={[
                        styles.schemePicker,
                        this.state.error.includes('scheme')
                          ? styles.invalid
                          : '',
                      ]}
                      onValueChange={this.inputHandler.bind(this, 'scheme')}>
                      {schemes.map((schemeItem, index) => {
                        // console.log('index', index);
                        return (
                          <Picker.Item
                            itemStyle={styles.schemeItem}
                            key={index}
                            label={schemeItem}
                            value={schemeItem}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      styles.datepickerContainer,
                      this.state.error.includes('depositeDate')
                        ? styles.invalid
                        : '',
                    ]}
                    onPress={() => {
                      this.setDatepickerVisibility(true, 'depositeDate');
                    }}>
                    <Text style={styles.datepickerText}>
                      {this.state.depositeDate
                        ? this.dateFormat(this.state.depositeDate)
                        : 'Select Deposite Date DD-MM-YYYY'}
                    </Text>
                  </TouchableOpacity>
                  {/* {datepickerVisibility && (
              <DateTimePicker
                // testID="dateTimePicker"
                style={styles.datepicker}
                value={depositeDate ? depositeDate : new Date().getTime()}
                // mode={'date'}
                //   is24Hour={true}
                // display="default"
                onChange={datepickerChange}
              />
            )} */}
                </View>
                <View style={[styles.multipleElement, styles.tenureContainer]}>
                  {/* <View style={styles.tenureLabel}>
              <View style={styles.userIconCon1}>
                <Image
                  source={require('./assets/images/tenure.png')}
                  style={styles.userIcon}
                />
              </View>
              <Text style={[styles.labelIcon]}>Tenure</Text>
            </View> */}
                  <View style={styles.tenureIconContainer}>
                    <Image
                      source={require('./assets/images/tenure.png')}
                      style={styles.tenureIcon}
                    />
                  </View>
                  <View style={[styles.multipleElement, styles.tenureInput]}>
                    <View style={[styles.years, styles.tenure]}>
                      <Picker
                        selectedValue={this.state.tenure.years}
                        style={styles.schemePicker}
                        onValueChange={this.inputHandler.bind(this, 'years')}
                        itemStyle={styles.pickerItem}>
                        <Picker.Item
                          key={`year`}
                          label={`Years`}
                          // value={year.toString()}
                        />
                        {years.map((year, index) => {
                          return (
                            <Picker.Item
                              key={`year-${index}`}
                              label={year.toString()}
                              value={year.toString()}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    <View style={[styles.months, styles.tenure]}>
                      <Picker
                        selectedValue={this.state.tenure.months}
                        style={styles.schemePicker}
                        onValueChange={this.inputHandler.bind(this, 'months')}>
                        <Picker.Item
                          key={`month`}
                          label={`Months`}
                          // value={year.toString()}
                        />
                        {months.map((month, index) => {
                          // console.log('index', index);
                          return (
                            <Picker.Item
                              key={`month-${index}`}
                              label={month.toString()}
                              value={month.toString()}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    <View style={[styles.days, styles.tenure]}>
                      <Picker
                        selectedValue={this.state.tenure.days}
                        style={styles.schemePicker}
                        onValueChange={this.inputHandler.bind(this, 'days')}>
                        <Picker.Item
                          key={`days`}
                          label={`Days`}
                          // value={year.toString()}
                        />
                        {days.map((day, index) => {
                          // console.log('index', index);
                          return (
                            <Picker.Item
                              key={`day-${index}`}
                              label={day.toString()}
                              value={day.toString()}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={styles.interestCon}>
                    <Image
                      source={require('./assets/images/rupees.png')}
                      style={styles.interestIcon}
                    />
                  </View>
                  <TextInput
                    style={[styles.textInput, styles.name]}
                    placeholder="Maturity Amount"
                    value={this.state.maturityAmount}
                    onChangeText={this.inputHandler.bind(
                      this,
                      'maturityAmount',
                    )}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.multipleElement}>
                  <View style={styles.schemeContainer}>
                    <View style={styles.interestCon}>
                      <Image
                        source={require('./assets/images/interest.png')}
                        style={styles.interestIcon}
                      />
                    </View>
                    <TextInput
                      style={[
                        styles.textInput,
                        styles.name,
                        this.state.error.includes('interestRate')
                          ? styles.invalid
                          : '',
                      ]}
                      placeholder="Interest Rate"
                      value={this.state.interestRate}
                      onChangeText={this.inputHandler.bind(
                        this,
                        'interestRate',
                      )}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[
                      styles.datepickerContainer,
                      this.state.error.includes('maturityDate')
                        ? styles.invalid
                        : '',
                    ]}
                    // onPress={() => {
                    //   this.setDatepickerVisibility(true, 'maturityDate');
                    // }}
                  >
                    <Text style={styles.datepickerText}>
                      {this.state.maturityDate
                        ? this.dateFormat(this.state.maturityDate)
                        : 'Select Maturity Date DD-MM-YYYY'}
                    </Text>
                  </TouchableOpacity>
                  {this.state.datepickerVisibility && (
                    <DateTimePicker
                      // testID="dateTimePicker"
                      style={[styles.datepicker]}
                      value={
                        this.state.maturityDate
                          ? this.state.maturityDate
                          : new Date().getTime()
                      }
                      // mode={'date'}
                      //   is24Hour={true}
                      // display="default"
                      onChange={this.datepickerChange.bind(this, 'maturity')}
                    />
                  )}
                </View>
                {/* <View>
                <AutoCompleteSearch data={familyList} css={styles.textInput} />
              </View> */}
                <View style={styles.multipleElement}>
                  <View style={[styles.certImgWra]}>
                    <TouchableOpacity
                      // onPress={this.openImagePicker}
                      onPress={() => this.openImagePicker('frontAvatarSource')}
                      style={styles.cerImgCon}>
                      {this.state.frontAvatarSource ? (
                        <Image
                          source={this.state.frontAvatarSource}
                          style={styles.uploadAvatar}
                        />
                      ) : (
                        <Image
                          source={require('./assets/images/front-certi.png')}
                          style={styles.uploadAvatar}
                        />
                      )}
                      <Text style={styles.imgLbl}>Front-image</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.certImgWra, styles.rightBorder]}>
                    <TouchableOpacity
                      onPress={() => this.openImagePicker('backAvatarSource')}
                      style={[styles.cerImgCon]}>
                      {this.state.backAvatarSource ? (
                        <Image
                          source={this.state.backAvatarSource}
                          style={styles.uploadAvatar}
                        />
                      ) : (
                        <Image
                          source={require('./assets/images/Back-certi.png')}
                          style={styles.uploadAvatar}
                        />
                      )}
                      <Text style={styles.imgLbl}>Back image</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    this.state.isDisable ? styles.disableBtn : '',
                  ]}
                  onPress={this.submitInvestment}>
                  <Text style={styles.submitText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContainer: {
    flex: 1,
    padding: 10,
  },
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
  textInputNoPad: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    fontSize: 18,
    // paddingStart: 50,
    // backgroundColor: 'darkgray',
  },
  multipleElement: {
    flexDirection: 'row',
    // flex: 1,
  },
  schemeContainer: {
    flex: 1,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  schemePicker: {
    height: 45,
    // width: 100,
    // backgroundColor: 'gray',
  },
  schemeItem: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    backgroundColor: 'yellow',
  },
  datepickerContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'lightgray',
    alignItems: 'center',
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  datepickerText: {
    fontSize: 15,
    textAlign: 'center',
  },
  tenureContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  tenureLabel: {
    justifyContent: 'center',
    // backgroundColor: 'gray',
    // borderBottomColor: Colors.primary,
    // borderBottomWidth: 1,
  },
  //   tenureText: {
  //     fontSize: 18,
  //     paddingHorizontal: 10,
  //   },
  tenureInput: {
    flex: 2,
    // backgroundColor: 'lightgray',
  },
  tenure: {flex: 1},
  months: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.primary,
  },
  labelIcon: {
    fontSize: 18,
    paddingHorizontal: 10,
    // paddingStart: 50,
  },
  tenureIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenureIcon: {
    width: '50%',
    height: 30,
  },
  interestCon: {
    width: 55,
    height: 49,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  interestIcon: {
    width: 30,
    height: 30,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 20,
    color: Colors.white,
  },
  invalid: {
    borderBottomColor: 'red',
  },
  certImgWra: {
    flex: 1,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    // borderRightWidth: 1,
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  uploadAvatar: {
    width: '70%',
    height: 100,
  },
  cerImgCon: {
    alignItems: 'center',
  },
  rightBorder: {
    borderLeftWidth: 1,
  },
  imgLbl: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
export default AddInvestment;
