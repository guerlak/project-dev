import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("show server_version;");
  const versionValue = databaseVersion.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;

  const dbOpenedConnections = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity where datname = $1`,
    values: [databaseName],
  });
  const openedConnectionsValue = dbOpenedConnections.rows[0].count;

  const maxConnections = await database.query("show max_connections");
  const maxConnectionsValue = parseInt(maxConnections.rows[0].max_connections);

  return res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;
