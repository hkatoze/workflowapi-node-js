const sqlsvr= require ('mssql')

async function connectToSqlserver(DBConfig) {
    try {
      const companyConnection = await sqlsvr.connect(DBConfig);

      console.log("Connexion à la base de données entreprise établie.");
      return companyConnection;
    } catch (err) {
        console.log("Erreur de connexion à la base de données entreprise"); 
      return false;
    }
  }

  module.exports=connectToSqlserver