import { Client } from "pg";

async function query(queryCommand) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  try {
    await client.connect();
    const result = await client.query(queryCommand);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query,
};
