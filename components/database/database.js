import * as SQLite from 'expo-sqlite';

// Create a database connection
const db = SQLite.openDatabaseSync('foodjournal.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      // Create users table 
      db.execSync(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          password TEXT
        );`
      );

      // Create journals table 
      db.execSync(
        `CREATE TABLE IF NOT EXISTS journals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          image TEXT,
          description TEXT,
          date TEXT,
          category TEXT,
          FOREIGN KEY(userId) REFERENCES users(id)
        );`
      );

      // Add indexes for optimization 
      db.execSync(
        `CREATE INDEX IF NOT EXISTS idx_journals_description
         ON journals(description);`
      );

      db.execSync(
        `CREATE INDEX IF NOT EXISTS idx_journals_category
         ON journals(category);`
      );

      console.log('Database initialized successfully');
      resolve(db);
    } catch (error) {
      console.error('Database initialization error:', error);
      reject(error);
    }
  });
};

export const executeSql = (query, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      // For SELECT queries
      if (query.trim().toUpperCase().startsWith('SELECT')) {
        const result = db.getAllSync(query, params);
        resolve({
          rows: {
            length: result.length,
            item: (index) => result[index],
            _array: result
          }
        });
      }
      // For INSERT queries
      else if (query.trim().toUpperCase().startsWith('INSERT')) {
        const result = db.runSync(query, params);
        resolve({
          insertId: result.lastInsertRowId,
          rows: {
            length: 0,
            item: () => null,
            _array: []
          }
        });
      }
      // For UPDATE, DELETE, CREATE queries
      else {
        db.runSync(query, params);
        resolve({
          rows: {
            length: 0,
            item: () => null,
            _array: []
          }
        });
      }
    } catch (error) {
      console.error('SQL execution error:', error, 'Query:', query, 'Params:', params);
      reject(error);
    }
  });
};