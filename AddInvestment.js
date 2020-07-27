import React, {useState} from 'react';
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
} from 'react-native';
import Header from './Header';
import Colors from './assets/colors';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
const schemes = ['RD', 'MIS', 'KVP', 'TD', 'Bank FD'];
const AddInvestment = () => {
  const [depositer, setDepositer] = useState({
    depositer1: null,
    depositer2: null,
    depositer3: null,
  });
  const [nominee, setNominee] = useState('');
  const [bankName, setBank] = useState('');
  const [branchName, setBranch] = useState('');
  const [scheme, setScheme] = useState('');
  const [depositeDate, setDepositeDate] = useState('');
  const [maturityDate, setMaturityDate] = useState('');
  const [tenure, setTenure] = useState({years: null, months: null, days: null});
  const [datepickerVisibility, setDatepickerVisibility] = useState(false);
  const [depositeAmount, setDepositeAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [isFocused, manageInputFocus] = useState(false);
  const years = [...Array(11).keys()];
  const months = [...Array(13).keys()];
  const days = [...Array(32).keys()];
  console.log('years', years);
  function inputHandler(field, value) {
    console.log('field', field);
    console.log('value', value);
    switch (field) {
      case 'depositer1':
      case 'depositer2':
      case 'depositer3':
        setDepositer({...depositer, [field]: value});
        console.log('depositer', depositer);
        break;
      case 'nominee':
        setNominee(value);
        break;
      case 'bankName':
        setBank(value);
        break;
      case 'branchName':
        setBranch(value);
        break;
      case 'scheme':
        setScheme(value);
        break;
      case 'depositeDate':
        setDepositeDate(value);
        break;
      case 'years':
      case 'months':
      case 'days':
        setTenure({...tenure, [field]: value});
        break;
    }
  }
  function datepickerChange(field, event) {
    console.log('datepicker change', event);
    console.log('datepicker field', field);
    switch (event.type) {
      case 'dismissed':
        setDatepickerVisibility(false);
        break;
      case 'set':
        setDatepickerVisibility(false);
        setDepositeDate(event.nativeEvent.timestamp);
        break;
      default:
        setDatepickerVisibility(false);
        break;
    }
  }
  function dateFormat(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
  }
  //   const labelStyle = {
  //     position: 'absolute',
  //     left: 50,
  //     top: !isFocused ? 12 : -2,
  //     fontSize: !isFocused ? 18 : 14,
  //     color: !isFocused ? '#aaa' : '#000',
  //   };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={styles.screenContainer}>
        <Header title="Add Investment" />
        <View style={styles.formContainer}>
          <View>
            {/* <Text style={labelStyle}>First Depositer Name</Text> */}
            <View style={styles.userIconCon}>
              <Image
                source={require('./assets/images/user.png')}
                style={styles.userIcon}
              />
            </View>
            <TextInput
              style={[styles.textInput, styles.name]}
              placeholder="Enter First Depositer Name"
              value={depositer.depositer1}
              onChangeText={inputHandler.bind(this, 'depositer1')}
              onFocus={() => manageInputFocus(true)}
              onBlur={() => manageInputFocus(false)}
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
              value={depositer.depositer2}
              onChangeText={inputHandler.bind(this, 'depositer2')}
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
              value={depositer.depositer3}
              onChangeText={inputHandler.bind(this, 'depositer3')}
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
              value={nominee}
              onChangeText={inputHandler.bind(this, 'nominee')}
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
              style={[styles.textInput, styles.name]}
              placeholder="Enter Bank Name"
              value={bankName}
              onChangeText={inputHandler.bind(this, 'bankName')}
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
              style={[styles.textInput, styles.name]}
              placeholder="Enter Branch Name"
              value={branchName}
              onChangeText={inputHandler.bind(this, 'branchName')}
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
              style={[styles.textInput, styles.name]}
              placeholder="Investment Amount"
              value={depositeAmount}
              onChangeText={inputHandler.bind(this, 'depositeAmount')}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.multipleElement}>
            <View style={styles.schemeContainer}>
              <Picker
                testID="Scheme"
                selectedValue={scheme}
                //   style={{height: 50, width: 150}}
                style={styles.schemePicker}
                onValueChange={inputHandler.bind(this, 'scheme')}>
                {schemes.map((schemeItem, index) => {
                  console.log('index', index);
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
              style={styles.datepickerContainer}
              onPress={() => {
                setDatepickerVisibility(true);
              }}>
              <Text style={styles.datepickerText}>
                {depositeDate
                  ? dateFormat(depositeDate)
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
                  selectedValue={tenure.years}
                  style={styles.schemePicker}
                  onValueChange={inputHandler.bind(this, 'years')}
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
                  selectedValue={tenure.months}
                  style={styles.schemePicker}
                  onValueChange={inputHandler.bind(this, 'months')}>
                  <Picker.Item
                    key={`month`}
                    label={`Months`}
                    // value={year.toString()}
                  />
                  {months.map((month, index) => {
                    console.log('index', index);
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
                  selectedValue={tenure.days}
                  style={styles.schemePicker}
                  onValueChange={inputHandler.bind(this, 'days')}>
                  <Picker.Item
                    key={`days`}
                    label={`Days`}
                    // value={year.toString()}
                  />
                  {days.map((day, index) => {
                    console.log('index', index);
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
              value={maturityAmount}
              onChangeText={inputHandler.bind(this, 'maturityAmount')}
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
                style={[styles.textInput, styles.name]}
                placeholder="Interest Rate"
                value={interestRate}
                onChangeText={inputHandler.bind(this, 'interestRate')}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.datepickerContainer}
              onPress={() => {
                setDatepickerVisibility(true);
              }}>
              <Text style={styles.datepickerText}>
                {maturityDate
                  ? dateFormat(maturityDate)
                  : 'Select Maturity Date DD-MM-YYYY'}
              </Text>
            </TouchableOpacity>
            {datepickerVisibility && (
              <DateTimePicker
                // testID="dateTimePicker"
                style={styles.datepicker}
                value={maturityDate ? maturityDate : new Date().getTime()}
                // mode={'date'}
                //   is24Hour={true}
                // display="default"
                onChange={datepickerChange.bind(this, 'maturity')}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
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
});
export default AddInvestment;
