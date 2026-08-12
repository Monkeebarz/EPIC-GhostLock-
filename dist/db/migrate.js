"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const pg_1 = require("pg");
async function main() {
    const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    const sql = await (0, promises_1.readFile)('sql/001_initial_schema.sql', 'utf8');
    await pool.query(sql);
    await pool.end();
    console.log('Database schema applied');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
