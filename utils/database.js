// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('books.db');

// export const init = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY NOT NULL, title TEXT, author TEXT);'
//     );
//   });
// };

// export const saveBook = (title, author) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO books (title, author) VALUES (?, ?);',
//         [title, author],
//         (_, result) => resolve(result),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const getBooks = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM books;',
//         [],
//         (_, result) => resolve(result.rows._array),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };
