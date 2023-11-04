import pg, { Client } from 'pg'

pg.types.setTypeParser(1082, (val) => val)

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'development' ? false : {
    rejectUnauthorized: false
  }
})
db.connect()
