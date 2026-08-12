import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = await readFile('sql/001_initial_schema.sql', 'utf8');
  await pool.query(sql);
  await pool.end();
  console.log('Database schema applied');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
