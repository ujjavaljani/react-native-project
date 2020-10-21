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
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investments: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.getInvestment();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  getInvestment = async () => {
    this.setState({isLoading: true});
    let investmentsData = await fetchRecords();
    investmentsData = investmentsData.raw().map((investment, index) => {
      return {...investment, key: `${index}`};
    });
    // console.log('investments in dashboard', investmentsData);
    this.setState({investments: investmentsData, isLoading: false});
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
              <Animated.View style={[styles.rowFrontContainer]}>
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
