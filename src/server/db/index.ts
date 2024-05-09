import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

export const db = drizzle(sql, { schema });
