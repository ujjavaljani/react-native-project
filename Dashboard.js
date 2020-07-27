import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Header from './Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const records = [
  {
    amount: 50000,
    id: 1,
    interestRate: 7.12,
    maturityAmount: 55000,
    month: 2,
    year: 1,
    days: 12,
    depositeDate: new Date(),
    maturityDate: new Date(),
    name: ['Ujjaval Jani', 'Ramesh Jani'],
    bankName: 'SBI',
    branch: 'Ambawadi',
  },
  {
    amount: 30000,
    id: 2,
    interestRate: 7.42,
    maturityAmount: 45000,
    month: 8,
    year: 2,
    days: 12,
    depositeDate: new Date(),
    maturityDate: new Date(),
    name: ['U.R.Jani', 'R.C.Jani'],
    bankName: 'Union Bank',
    branch: 'Shahibaug',
  },
  {
    amount: 40000,
    id: 3,
    interestRate: 8.12,
    maturityAmount: 85000,
    month: 2,
    year: 1,
    days: 10,
    depositeDate: new Date(),
    maturityDate: new Date(),
    name: ['S.R.Jani', 'R.C.Jani'],
    bankName: 'Axis Bank',
    branch: 'Naranpura',
  },
  {
    amount: 60000,
    id: 4,
    interestRate: 5.12,
    maturityAmount: 75000,
    month: 6,
    year: 2,
    days: 12,
    depositeDate: new Date(),
    maturityDate: new Date(),
    name: ['R.C.Jani', 'S.R.Jani'],
    bankName: 'icici',
    branch: 'Sindhu bhavan',
  },
];
const Dashboard = () => {
  return (
    <View style={styles.dashboardScreen}>
      <Header title="Dashboard" />
      <FlatList
        data={records}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.depositerName}>{item.name[0]}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{item.amount}</Text>
              <View style={styles.percentageContainer}>
                <Text>{`${item.interestRate}%`}</Text>
                <Text>-------------></Text>
              </View>
              <Text style={styles.amount}>{item.maturityAmount}</Text>
            </View>
            <View style={styles.bankContainer}>
              <Text style={styles.bankLabel}>Bank:</Text>
              <Text style={styles.bankName}>{item.bankName}</Text>
              <Text style={styles.branchName}>{`( ${item.branch} )`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dashboardScreen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    padding: 10,
  },
  amountContainer: {
    flexDirection: 'row',
  },
  depositerName: {
    fontSize: 20,
  },
  amount: {
    fontSize: 22,
    // flex: 1,
    // textAlign: 'center',
    // alignSelf: 'flex-start',
    alignContent: 'flex-start',
    paddingTop: 10,
    // backgroundColor: 'green',
  },
  percentageContainer: {
    // flex: 1,
    // backgroundColor: 'gray',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bankContainer: {
    flexDirection: 'row',
  },
  bankLabel: {fontWeight: 'bold', fontSize: 15},
  bankName: {fontSize: 15, paddingStart: 10},
  branchName: {paddingStart: 5},
});
export default Dashboard;