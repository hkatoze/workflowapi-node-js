const checkMySqlConnection = require("../functions/checkMysqlConnection");
const checkSqlServerConnection = require("../functions/checkSqlSrvConnection");
const sqlsvr = require("mssql");
const tableExists = require("../functions/checkTableExist");
class User {
  constructor(databases) {
    this.table = "WORKFLOWUSERS";
    this.connexion = null;
    this.companyName;
    this.emailAdd;
    this.username;
    this.department;
    this.grade;
    this.password;
    this.maxAmount;

    if (this.connexion === null) {
      this.connexion = databases;
    }
  }
  async login() {
    const response = { code: 3, user: null };

    const selectQuery = `SELECT * FROM ${this.table} WHERE EMAILADD = '${this.emailAdd}'`;

    try {
      const results = await new Promise((resolve, reject) => {
        this.connexion.query(selectQuery, (error, results) => {
          if (error) {
            resolve(null);
          } else {
            resolve(results);
          }
        });
      });

      if (
        results &&
        (this.companyName == "vision"
          ? results.length
          : results.recordset.length) > 0
      ) {
        if (
          this.password ===
          (this.companyName == "vision"
            ? results[0].PASSWORD
            : results.recordset[0].PASSWORD)
        ) {
          response.code = 1;
          response.user =
            this.companyName == "vision" ? results[0] : results.recordset[0];
        } else {
          // Le mot de passe est incorrect
          response.code = 2;
        }
      } else {
        // Aucun résultat trouvé pour cette adresse e-mail
        response.code = 0;
      }

      if (this.companyName != "vision") {
      } else {
        this.connexion.end();
      }

      return response;
    } catch (error) {
      if (this.companyName != "vision") {
      } else {
        this.connexion.end();
      }

      return response;
    }
  }

  async signup() {
    // Vérifier si la table "workflowusers" existe déjà
    const tableExist = await tableExists(this.connexion, this.table,this.companyName);
 

    if (!tableExist) {
      // Créer la table "workflowusers" si elle n'existe pas
      const createTableQuery = `
          CREATE TABLE ${this.table} (
            COMPANYID VARCHAR(255),
            EMAILADD VARCHAR(255) PRIMARY KEY,
            USERNAME VARCHAR(255),
            DEPARTMENT VARCHAR(255),
            GRADE VARCHAR(255),
            PASSWORD VARCHAR(255),
            MAXAMOUNT VARCHAR(255)
          )
        `;
      await this.connexion.query(createTableQuery);
    }

    // Insérer les informations de l'utilisateur dans la table "workflowusers"
    const insertQuery = `
        INSERT INTO ${this.table} (COMPANYID, EMAILADD, USERNAME, DEPARTMENT, GRADE, PASSWORD, MAXAMOUNT)
        VALUES ('${this.companyName}', '${this.emailAdd}', '${this.username}', '${this.department}', '${this.grade}', '${this.password}', '${this.maxAmount}')
      `;

    return new Promise((resolve, reject) => {
      this.connexion.query(insertQuery, (error) => {
        if (error) {
          if (this.companyName != "vision") {
          } else {
            this.connexion.end();
          }
          // console.log("Erreur lors de l'exécution de la requête SELECT :",error);
          resolve(false);
        } else {
          if (this.companyName != "vision") {
          } else {
            this.connexion.end();
          }
          resolve(true);
        }
      });
    });
  }

  async getAllUsers() {
    const query = `SELECT * FROM ${this.table}`;
    return new Promise((resolve, reject) => {
      if (this.connexion != false) {
        this.connexion.query(query, async (error, results) => {
          if (error) {
            if (this.companyName == "vision") {
              this.connexion.end();
            } else {
            }
            console.error("Erreur lors de l'exécution de la requête :", error);
            reject(error);
            return;
          }
          const formattedUsers = [];
          if (this.companyName != "vision") {
            for (const user of results.recordset) {
              formattedUsers.push({
                COMPANYID: user.COMPANYID,
                EMAILADD: user.EMAILADD,
                USERNAME: user.USERNAME,
                DEPARTMENT: user.DEPARTMENT,
                GRADE: user.GRADE,
                PASSWORD: user.PASSWORD,
                MAXAMOUNT: user.MAXAMOUNT,
              });
            }
          } else {
            for (const user of results) {
              formattedUsers.push({
                COMPANYID: user.COMPANYID,
                EMAILADD: user.EMAILADD,
                USERNAME: user.USERNAME,
                DEPARTMENT: user.DEPARTMENT,
                GRADE: user.GRADE,
                PASSWORD: user.PASSWORD,
                MAXAMOUNT: user.MAXAMOUNT,
              });
            }
          }

          if (this.companyName != "vision") {
          } else {
            this.connexion.end();
          }
          resolve(formattedUsers);
        });
      } else {
        resolve({
          message:
            "Impossible de se connecter à la base de données de " +
            this.companyName,
        });
      }
    });
  }
}

module.exports = User;
