const mysql = require("mysql");

function getAdminConnexion() {
  // Remplacez les valeurs ci-dessous par les informations de votre base de données MySQL.
  const config = {
    host: "vbs-solutions.com",
    user: "u833159023_kinda",
    password: "Kind@1404",
    database: "u833159023_workflow_admin",
  };
  return mysql.createConnection(config);
}
module.exports=getAdminConnexion