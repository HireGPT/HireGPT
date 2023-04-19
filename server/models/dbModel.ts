import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.DATABASEAPIKEY;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
// module.exports = {
//   db: (text, params, callback) => {
//     console.log(`This is the text: ${text} and this is the params: ${params}`);
//     return pool.query(text, params, callback);
//   },
// };

export const db = {
  query: (text: string, params: any[]): Promise<QueryResult> => {
    // console.log(`This is the text: ${text} and this is the params: ${params}`);
    return pool.query(text, params);
  },
};
