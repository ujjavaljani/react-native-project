import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
// const database_name = "investmentApp.db";
// const database_version = "1.0";
// const database_displayname = "SQLite React Offline Database";
// const database_size = 200000;
// global.db = null;
export async function dbConnect() {
  console.log('inside db connect', global.db);
  global.db = null;
  if (!global.db) {
    console.log('inside db connect condition');
    global.db = await SQLite.openDatabase(
      {
        name: 'testDB',
        createFromLocation: '~investmentApp.db',
        // createFromLocation: 1,
        // location: 'Shared',
        // location: 'default',
      },
      () => {
        console.log('success');
      },
      error => {
        console.log('error in connect db', error);
      },
    );
  }
  return global.db;
}
export async function ExecuteQuery(sql, params = []) {
  const db = await dbConnect();
  return new Promise((resolve, reject) => {
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (transData, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });
}

export async function addRecord(params) {
  console.log('db object', global.db);
  return await ExecuteQuery(
    'Insert into investments (name1,name2,name3,nomineeName,schemeType,bankName,branch,depositeDate,maturityDate,depositeDurationYears,depositeDurationMonths,depositeDurationDays,depositeAmount,maturityAmount,interestRate,frontImage,backImage,accountNumber) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      params.depositer.depositer1,
      params.depositer.depositer2,
      params.depositer.depositer3,
      params.nominee,
      params.scheme,
      params.bankName,
      params.branchName,
      params.depositeDate,
      params.maturityDate,
      params.tenure.years,
      params.tenure.months,
      params.tenure.days,
      params.depositeAmount,
      params.maturityAmount,
      params.interestRate,
      params.frontUrl,
      params.backUrl,
      params.accountNo,
    ],
  );
  //   fetchRecords();
}
export async function fetchRecords() {
  const response = await ExecuteQuery('SELECT * FROM investments', []);
  console.log('Response in fetch', response.rows);
  //   console.log('response', response.rows.item(6));
  return response.rows;
}
