// services/db.js (or db.ts if you're using TypeScript)

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db.vfbplstussepgotazzyy.supabase.co",
  database: "postgres",
  password: "MyProject@123", // 🔐 Replace with real password (no brackets!)
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
