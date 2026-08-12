import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';
export function createDatabase(url = process.env.DATABASE_URL ?? '') { const pool = new Pool({ connectionString: url }); return { db: drizzle(pool, { schema }), pool }; }
