import db from "./connection.js"
// assignment: Create volcanoes table, define the SQL below

const isDeleteMode = process.argv.includes("delete");

if(isDeleteMode) {
    await db.run(`DROP TABLE IF EXISTS chatters`);
};

// DDL
db.exec(`CREATE TABLE IF NOT EXISTS chatters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
`);

