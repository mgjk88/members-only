require("dotenv").config();
const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS users
 (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 fullname VARCHAR(255),
 member BOOLEAN,
 admin BOOLEAN,
 username VARCHAR(255) UNIQUE NOT NULL,
 password VARCHAR(255)
 );

 CREATE TABLE IF NOT EXISTS messages 
 (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 message VARCHAR(255),
 datetime BIGINT,
 user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
 );
 `;

async function main() {
  console.log("initializing...");
  try {
    const client = new Client({ connectionString: process.env.DB_STRING });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (error) {
    console.log('initization failed!');
    console.error(error);
  }
}

main();
