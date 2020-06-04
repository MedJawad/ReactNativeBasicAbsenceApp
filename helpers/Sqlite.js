import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = 'gestionAbsence.db';
let db;

const updateProgress = (text, resetState) => {
  // console.log(text, resetState);
};

const errorCB = err => {
  // console.log('error: ', err);
  updateProgress('Error: ' + (err.message || err));
  return false;
};

const successCB = () => {
  console.log('SQL executed ...');
};

const openCB = () => {
  updateProgress('Database OPEN');
};

const closeCB = () => {
  updateProgress('Database CLOSED');
};

const deleteCB = () => {
  console.log('Database DELETED');
  updateProgress('Database DELETED');
};

// const populateDatabase = db => {
//   updateProgress('Database integrity check');
//   db.executeSql(
//     'SELECT 1 FROM Version LIMIT 1',
//     [],
//     () => {
//       updateProgress('Database is ready ... executing query ...');
//       db.transaction(queryEmployees, errorCB, () => {
//         updateProgress('Processing completed');
//       });
//     },
//     error => {
//       console.log('received version error:', error);
//       updateProgress('Database not yet ready ... populating data');
//       db.transaction(populateDB, errorCB, () => {
//         updateProgress('Database populated ... executing query ...');
//         db.transaction(queryEmployees, errorCB, () => {
//           console.log('Transaction is now finished');
//           updateProgress('Processing completed');
//           closeDatabase();
//         });
//       });
//     },
//   );
// };

// const populateDB = tx => {
//   updateProgress('Executing DROP stmts');

//   tx.executeSql('DROP TABLE IF EXISTS Employees;');
//   tx.executeSql('DROP TABLE IF EXISTS Offices;');
//   tx.executeSql('DROP TABLE IF EXISTS Departments;');

//   updateProgress('Executing CREATE stmts');

//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS Version( ' +
//       'version_id INTEGER PRIMARY KEY NOT NULL); ',
//     [],
//     successCB,
//     errorCB,
//   );

//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS Departments( ' +
//       'department_id INTEGER PRIMARY KEY NOT NULL, ' +
//       'name VARCHAR(30) ); ',
//     [],
//     successCB,
//     errorCB,
//   );

//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS Offices( ' +
//       'office_id INTEGER PRIMARY KEY NOT NULL, ' +
//       'name VARCHAR(20), ' +
//       'longtitude FLOAT, ' +
//       'latitude FLOAT ) ; ',
//     [],
//     successCB,
//     errorCB,
//   );

//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS Employees( ' +
//       'employe_id INTEGER PRIMARY KEY NOT NULL, ' +
//       'name VARCHAR(55), ' +
//       'office INTEGER, ' +
//       'department INTEGER, ' +
//       'custom_info TEXT DEFAULT "",' +
//       'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) ' +
//       'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));',
//     [],
//   );

//   updateProgress('Executing INSERT stmts');

//   tx.executeSql(
//     'INSERT INTO Departments (name) VALUES ("Client Services");',
//     [],
//   );
//   tx.executeSql(
//     'INSERT INTO Departments (name) VALUES ("Investor Services");',
//     [],
//   );
//   tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");', []);
//   tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");', []);

//   tx.executeSql(
//     'INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.);',
//     [],
//   );
//   tx.executeSql(
//     'INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.);',
//     [],
//   );
//   tx.executeSql(
//     'INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.);',
//     [],
//   );
//   tx.executeSql(
//     'INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.);',
//     [],
//   );

//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Sylvester Stallone", 2, 4, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Elvis Presley", 2, 4, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Leslie Nelson", 3, 4, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Fidel Castro", 3, 3, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Bill Clinton", 1, 3, '{"known": false}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Margaret Thatcher", 1, 3, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Donald Trump", 2, 4, '{"known": true, "impeached": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Dr DRE", 2, 2, '{"known": true}')`,
//     [],
//   );
//   tx.executeSql(
//     `INSERT INTO Employees (name, office, department, custom_info) VALUES ("Samantha Fox", 2, 1, '{"known": true}')`,
//     [],
//   );

//   console.log('all config SQL done');
// };

// const queryEmployees = async tx => {
//   console.log('Executing JSON1 queries...');

//   // 1. JSON_OBJECT
//   await tx.executeSql(
//     `SELECT JSON_OBJECT('name', e.name, 'office_id', e.office, 'department_id', e.department) AS data FROM Employees e`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 2. JSON_ARRAY
//   // Expected: [1,2,"3",4]
//   await tx.executeSql(
//     `SELECT JSON_ARRAY(1, 2, '3', 4) AS data `,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 3. JSON_ARRAY_LENGTH
//   // Expected: 4
//   await tx.executeSql(
//     `SELECT JSON_ARRAY_LENGTH('[1, 2, 3, 4]') AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 4. JSON_EXTRACT
//   await tx.executeSql(
//     `SELECT JSON_EXTRACT(e.custom_info, '$.known')  AS data FROM Employees e`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 5. JSON_INSERT
//   // Expected: {"a":1,"b":2,"c":3}
//   await tx.executeSql(
//     `SELECT JSON_INSERT('{"a": 1, "b": 2}', '$.c', 3)  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 6. JSON_REPLACE
//   // Expected: {"a":1,"b":3}
//   await tx.executeSql(
//     `SELECT JSON_REPLACE('{"a": 1, "b": 2}', '$.b', 3)  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 7. JSON_SET
//   // Expected: {"a":1,"b":123}
//   await tx.executeSql(
//     `SELECT JSON_SET('{"a": 1, "b": 2}', '$.b', 123)  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 8. JSON_REMOVE
//   // Expected: {"a":1"}
//   await tx.executeSql(
//     `SELECT JSON_REMOVE('{"a": 1, "b": 2}', '$.b')  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 9. JSON_TYPE
//   // Expected: integer
//   await tx.executeSql(
//     `SELECT JSON_TYPE('{"a": 1, "b": 2}', '$.a')  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 10. JSON_VALID
//   // Expected: 0
//   await tx.executeSql(
//     `SELECT JSON_VALID('{"a": 1, "b": 2')  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );

//   // 11. JSON_QUOTE
//   // Expected: "value"
//   await tx.executeSql(
//     `SELECT JSON_QUOTE('value')  AS data`,
//     [],
//     querySuccess,
//     errorCB,
//   );
// };

const deleteDatabase = () => {
  db = SQLite.openDatabase(database_name, openCB, errorCB);

  db.transaction(
    tx => {
      tx.executeSql('DROP TABLE IF EXISTS Absences;');
      tx.executeSql('DROP TABLE IF EXISTS Etudiants;');
      tx.executeSql('DROP TABLE IF EXISTS Classes;');
    },
    errorCB,
    () => {
      updateProgress('Deleting database');
    },
  );

  SQLite.deleteDatabase(database_name, deleteCB, errorCB);
};

const openDatabase = () => {
  updateProgress('Opening database ...', true);
  db = SQLite.openDatabase(database_name, openCB, errorCB);
  db.transaction(createTables, errorCB, () => {
    updateProgress('Database populated ... executing query ...');
  });
};

const closeDatabase = () => {
  if (db) {
    console.log('Closing database ...');
    updateProgress('Closing database');
    db.close(closeCB, errorCB);
  } else {
    updateProgress('Database was not OPENED');
  }
};
const createTables = tx => {
  tx.executeSql('PRAGMA foreign_keys = ON');
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Classes( ' +
      'nom VARCHAR(30) PRIMARY KEY NOT NULL ); ',
    [],
    successCB,
    errorCB,
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Etudiants( ' +
      'cne VARCHAR(30) PRIMARY KEY NOT NULL, ' +
      'nom VARCHAR(30), ' +
      'prenom VARCHAR(30), ' +
      'classe VARCHAR(30), ' +
      'FOREIGN KEY ( classe ) REFERENCES Classes ( classe_id ) ON DELETE CASCADE);',

    [],
    successCB,
    errorCB,
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Absences( ' +
      'absence_id INTEGER PRIMARY KEY NOT NULL, ' +
      'date VARCHAR(30), ' +
      'etudiant VARCHAR(30), ' +
      'FOREIGN KEY ( etudiant ) REFERENCES Etudiants ( cne ) ON DELETE CASCADE);',

    [],
    successCB,
    errorCB,
  );
  //   tx.executeSql('INSERT INTO Classes (nom) VALUES ("Genie Chihaja");', []);
};

const querySuccess = (tx, results, callback) => {
  updateProgress('Query completed');
  let data = [];
  var len = results.rows.length;
  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
    updateProgress(`${row.data}`);
  }
  // console.log(data);

  return data;
};

const saveClasse = async classe => {
  await db.transaction(
    tx => {
      let students = classe.students || [];
      tx.executeSql(`INSERT INTO Classes (nom) VALUES ("${classe.nom}");`, []);
      students.map(student =>
        tx.executeSql(
          `INSERT INTO Etudiants (cne,nom,prenom,classe) VALUES ("${
            student.CNE
          }","${student.NOM}","${student.PRENOM}","${classe.nom}");`,
          [],
        ),
      );
    },

    errorCB,
    () => {
      updateProgress('Database populated ... executing query ...');
    },
  );
};

const fetchClasses = async fnCB => {
  db = await SQLite.openDatabase(database_name, openCB, errorCB);
  return db.transaction(tx => {
    return tx.executeSql(
      `SELECT * FROM Classes`,
      [],
      (tx, results) => fnCB(querySuccess(tx, results)),
      errorCB,
    );
  });
};
const deleteClasse = async classeNom => {
  db = await SQLite.openDatabase(database_name, openCB, errorCB);
  return db.transaction(tx => {
    tx.executeSql(`DELETE FROM Etudiants WHERE classe="${classeNom}"`);
    return tx.executeSql(
      `DELETE FROM Classes WHERE nom="${classeNom}"`,
      [],
      (tx, results) => console.log(querySuccess(tx, results)),
      errorCB,
    );
  });
};
const fetchEtudiants = async (classeID, fnCB) => {
  db = await SQLite.openDatabase(database_name, openCB, errorCB);
  return db.transaction(tx => {
    return tx.executeSql(
      `SELECT * FROM Etudiants WHERE classe="${classeID}"`,
      [],
      (tx, results) => fnCB(querySuccess(tx, results)),
      errorCB,
    );
  });
};
const saveAbsences = async absents => {
  await db.transaction(
    tx => {
      absents.map(absent =>
        tx.executeSql(
          `INSERT INTO Absences (date,etudiant) VALUES ("${Date.now()}","${absent}");`,
          [],
        ),
      );
    },
    errorCB,
    () => {
      updateProgress('Database populated ... executing query ...');
    },
  );
};
const fetchAbsences = async (etudiantID, fnCB) => {
  db = await SQLite.openDatabase(database_name, openCB, errorCB);
  return db.transaction(tx => {
    return tx.executeSql(
      `SELECT * FROM Absences WHERE etudiant="${etudiantID}"`,
      [],
      (tx, results) => fnCB(querySuccess(tx, results)),
      errorCB,
    );
  });
};
const deleteAbsence = async absenceID => {
  db = await SQLite.openDatabase(database_name, openCB, errorCB);
  return db.transaction(tx => {
    return tx.executeSql(
      `DELETE FROM Absences WHERE absence_id="${absenceID}"`,
      [],
      (tx, results) => console.log(querySuccess(tx, results)),
      errorCB,
    );
  });
};
export default (db = {
  openDatabase,
  closeDatabase,
  deleteDatabase,
  saveClasse,
  fetchClasses,
  deleteClasse,
  fetchEtudiants,
  saveAbsences,
  fetchAbsences,
  deleteAbsence,
});
