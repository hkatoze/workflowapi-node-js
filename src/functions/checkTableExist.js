async function tableExists(connection,tableName,companyName) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SHOW TABLES LIKE '${tableName}'`,
        (error, results) => {
          if (error) {
            reject(error);
            
          } else {
            resolve(results.length > 0);
           
          }
        }
      );
    });
  }

  module.exports=tableExists