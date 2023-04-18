const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.DATABASEAPIKEY;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log(`This is the text: ${text} and this is the params: ${params}`);
    return pool.query(text, params, callback);
  },
};

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	name text not null,
	description text null,
	date timestamp with time zone not null,
	loc_name text not null,
	organizer_id INTEGER REFERENCES users (id),
	lat INTEGER NULL,
	lng INTEGER NULL,
	address CHARACTER VARYING (500)
)
