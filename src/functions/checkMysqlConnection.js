const mysql= require('mysql')



async function checkMySqlConnection(server, user, password, database) {
    try {
      const config = {
        host: server.replace(/\\\\/g, "\\"),
        user: user,
        password: password,
        database: database,
      };
      const connection= mysql.createConnection(config);
  
      connection.end();
  
      return true;
    } catch (error) {
      connection.end();
      //console.log(error);
      return false;
    } 
  }

 module.exports=checkMySqlConnection