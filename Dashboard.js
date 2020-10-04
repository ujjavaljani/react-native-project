import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  RefreshControl,
  Alert,
  Animated,
} from 'react-native';
import Header from './Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fetchRecords, deleteRecord} from './utils/dbOperations';
import Drawer from './Drawer';
import {SwipeListView} from 'react-native-swipe-list-view';
import colors from './assets/colors';
import Loader from './Loader';
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investments: [],
      isLoading: false,
    };
    this.getInvestment();
  }
  // componentDidMount() {
  //   console.log('dashboard Constructor');

  // }
  getInvestment = async () => {
    this.setState({isLoading: true});
    let investmentsData = await fetchRecords();
    // investmentsData = investmentsData.raw().map((investment, index) => {
    //   return {...investment, key: `${index}`};
    // });
    // console.log('investments in dashboard', investmentsData);
    this.setState({investments: investmentsData.raw(), isLoading: false});
    // setTimeout(() => {
    // }, 5000);
  };
  deleteInvestment = deleteData => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure? Do you want to delete it',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteRecord(deleteData.item.investmentId);
            this.getInvestment();
          },
        },
      ],
    );
  };
  render() {
    console.log('Render of dashboard', this.state);
    return (
      <View style={styles.dashboardScreen}>
        <Loader loading={this.state.isLoading} />
        <Header
          title="Dashboard"
          right={true}
          rightHandler={() => this.props.navigation.navigate('Investment')}
        />
        {/* <ScrollView
          contentContainerStyle={styles.scrollView}
          >
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView> */}
        {this.state.investments.length > 0 && (
          <SwipeListView
            disableRightSwipe
            data={this.state.investments}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.getInvestment}
              />
            }
            renderItem={({item}) => (
              <Animated.View
                style={[
                  styles.rowFrontContainer,
                  {
                    height: rowTranslateAnimatedValues[
                      data.item.key
                    ].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 50],
                    }),
                  },
                ]}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate('InvestmentDetail', {
                      investment: item,
                    })
                  }>
                  <View style={styles.item}>
                    <Text style={styles.depositerName}>{item.name1}</Text>
                    <View style={styles.amountContainer}>
                      <Text style={styles.amount}>{item.depositeAmount}</Text>
                      <View style={styles.percentageContainer}>
                        <Text>{`${item.interestRate}%`}</Text>
                        <Text>-------------></Text>
                      </View>
                      <Text style={styles.amount}>{item.maturityAmount}</Text>
                    </View>
                    <View style={styles.bankContainer}>
                      <Text style={styles.bankLabel}>Bank:</Text>
                      <Text style={styles.bankName}>{item.bankName}</Text>
                      <Text style={styles.branchName}>{`( ${
                        item.branch
                      } )`}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                {/* <Text style={[styles.backTextWhite, styles.editBtn]}>
                    Edit
                  </Text> */}
                <TouchableWithoutFeedback
                  onPress={() => this.deleteInvestment(data)}>
                  <View style={[styles.backDeleteBtn, styles.deleteBtnRight]}>
                    <Text style={[styles.backTextWhite, styles.deleteBtn]}>
                      Delete
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
          // <FlatList
          //   data={this.state.investments}
          //   renderItem={({item}) => (
          //     <TouchableWithoutFeedback
          //       onPress={() =>
          //         this.props.navigation.navigate('InvestmentDetail', {
          //           investment: item,
          //         })
          //       }>
          //       <View style={styles.item}>
          //         <Text style={styles.depositerName}>{item.name1}</Text>
          //         <View style={styles.amountContainer}>
          //           <Text style={styles.amount}>{item.depositeAmount}</Text>
          //           <View style={styles.percentageContainer}>
          //             <Text>{`${item.interestRate}%`}</Text>
          //             <Text>-------------></Text>
          //           </View>
          //           <Text style={styles.amount}>{item.maturityAmount}</Text>
          //         </View>
          //         <View style={styles.bankContainer}>
          //           <Text style={styles.bankLabel}>Bank:</Text>
          //           <Text style={styles.bankName}>{item.bankName}</Text>
          //           <Text style={styles.branchName}>{`( ${
          //             item.branch
          //           } )`}</Text>
          //         </View>
          //       </View>
          //     </TouchableWithoutFeedback>
          //   )}
          // />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dashboardScreen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    padding: 10,
    backgroundColor: colors.white,
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
  rowBack: {
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backDeleteBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  deleteBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: colors.white,
  },
  deleteBtn: {
    // backgroundColor: 'red',
  },
});
export default Dashboard;
