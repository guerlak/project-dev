import database from "infra/database.js";

async function status(req, res) {
  const db_res = await database.query("select 1 + 1 as SUM;");
  console.log(db_res.rows);
  res.status(200).json({ ok: "ok" });
}

export default status;
