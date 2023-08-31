const checkMySqlConnection = require("../functions/checkMysqlConnection");
const checkSqlServerConnection = require("../functions/checkSqlSrvConnection");
const sqlsvr = require("mssql");

class Company {
  constructor(databases) {
    this.table = "Company";
    this.connexion = null;
    this.id;
    this.backgroundColor;
    this.companyName;
    this.username;
    this.databaseName;
    this.password;
    this.servername;

    if (this.connexion === null) {
      this.connexion = databases;
    }
  }

  async getCompanies() {
    const query = `SELECT * FROM ${this.table}`;
    return new Promise((resolve, reject) => {
      this.connexion.query(query, async (error, results) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject(error);
          return;
        } else {
          const queryGrade = `SELECT * FROM Grade`;

          this.connexion.query(queryGrade, async (error, gradeResults) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              const grades = gradeResults;

              const queryDepartment = `SELECT * FROM Department`;

              this.connexion.query(
                queryDepartment,
                async (error, departmentResults) => {
                  if (error) {
                    console.error(error);
                    reject(error);
                  } else {
                    const departments = departmentResults;

                    const formattedCompanies = [];
                    for (const company of results) {
                      const companyId = company.id;
                      const gradeFiltered = [];
                      const departmentFiltered = [];

                      for (const grade of grades) {
                        if (grade.companyId == companyId) {
                          gradeFiltered.push({
                            id: `${grade.id}`,
                            companyId: `${grade.companyId}`,
                            word: grade.word,
                            maxAmount: grade.maxAmount,
                          });
                        }
                      }

                      for (const department of departments) {
                        if (department.companyId == companyId) {
                          departmentFiltered.push({
                            id: `${department.id}`,
                            companyId: `${department.companyId}`,
                            departmentName: department.departmentName,
                          });
                        }
                      }

                      const connectionStatus =
                        company.servername == "vbs-solutions.com"
                          ? await checkMySqlConnection(
                              company.servername,
                              company.username,
                              company.password,
                              company.databaseName
                            )
                          : await checkSqlServerConnection(
                              company.servername,
                              company.username,
                              company.password,
                              company.databaseName
                            );
                            const formattedServername = company.servername.replace(/\\\\/g, "\\")
                      formattedCompanies.push({
                        id: `${companyId}`,
                        backgroundColor: company.backgroundColor,
                        companyName: company.companyName,
                        username: company.username,
                        databaseName: company.databaseName,
                        password: company.password,
                        servername: `${formattedServername}`,
                        status: connectionStatus,
                        grades: gradeFiltered,
                        departments: departmentFiltered,
                      });
                    }
                    this.connexion.end();
                    resolve(formattedCompanies);
                  }
                }
              );
            }
          });
        }
      });
    });
  }

  async createCompany() {
    
    const query = `INSERT INTO ${this.table} (backgroundColor, companyName, username, databaseName, password, servername) VALUES ('${this.backgroundColor}','${this.companyName}', '${this.username}', '${this.databaseName}', '${this.password}', '${this.servername}')`;

    return new Promise(async (resolve, reject) => {
      await this.connexion.query(query, (erreur) => {
        if (erreur) {
          console.log("Erreur lors de la création de la compagnie :", erreur);
          this.connexion.end();
          console.log(erreur);
          resolve({
            status: "error",
            message: "Echec lors de la création d'une nouvelle compagnie",
          });
        } else {
          this.connexion.end();
          resolve({
            status: "success",
            message: "Nouvelle compagnie ajoutée",
          });
        }
      });
    });
     
  }

  async updateCompany() {
    try {
      // Requête pour mettre à jour la compagnie

      const query = `UPDATE ${this.table} SET databaseName = '${this.databaseName}', servername = '${this.servername}', username = '${this.username}', password = '${this.password}' WHERE id = ${this.id}`;
      return new Promise(async (resolve, reject) => {
        await this.connexion.query(query, (erreur, resultats) => {
          if (erreur) {
            console.log("Erreur lors de la mise à jour des champs :", erreur);
            this.connexion.end();
            resolve(false);
          } else {
            this.connexion.end();
            console.log("Champs mis à jour avec succès !");
            resolve(true);
          }
        });
      });
    } catch (error) {
      console.log(error);
      this.connexion.end();
      return false;
    }
  }

  async getCompanyByName() {
    const response = {
      status: "error",
      message:
        "Erreur lors de la récupération des informations de la compagnie.",
    };

    try {
      // Requête pour récupérer les informations de la compagnie avec le nom spécifié
      const queryCompany = `SELECT * FROM ${this.table} WHERE companyName = '${this.companyName}'`;

      return new Promise((resolve, reject) => {
        this.connexion.query(queryCompany, (error, resultsCompany) => {
          if (error) {
            reject(error);
            console.error(error);
          } else {
            const company = resultsCompany[0];

            if (!company) {
              // La compagnie n'existe pas
              response.message =
                "La compagnie avec le nom spécifié n'existe pas.";
              this.connexion.end();
              resolve({
                status: "error",
                message: "La compagnie avec le nom spécifié n'existe pas.",
              });
            } else {
              // Requête pour récupérer les grades de la compagnie
              const queryGrades = `SELECT * FROM Grade WHERE companyId = '${company.id}'`;
              this.connexion.query(queryGrades, (error, resultsGrade) => {
                if (error) {
                  this.connexion.end();
                  console.error(error);

                  reject(error);
                } else {
                  const grades = resultsGrade;

                  // Requête pour récupérer les départements de la compagnie
                  const queryDepartments = `SELECT * FROM Department WHERE companyId = '${company.id}'`;
                  this.connexion.query(
                    queryDepartments,
                    (error, resultsDepartment) => {
                      if (error) {
                        this.connexion.end();
                        console.error(error);
                        reject(error);
                      } else {
                        const departments = resultsDepartment;

                        // Ajouter les grades et les départements à la compagnie
                        company.grades = grades;
                        company.departments = departments;

                        response.status = "success";
                        response.message =
                          "Informations de la compagnie récupérées avec succès.";
                        response.data = company;
                        this.connexion.end();
                        resolve({
                          status: "success",
                          message:
                            "Informations de la compagnie récupérées avec succès.",
                          data: company,
                        });
                      }
                    }
                  );
                }
              });
            }
          }
        });
      });
    } catch (error) {
      // Gérer les erreurs de connexion à la base de données ou autres erreurs éventuelles

      this.connexion.end();
      console.error(error);
      return {
        status: "error",
        message:
          "Erreur lors de la récupération des informations de la compagnie : " +
          error.message,
      };
    }
  }

  async testConnexion() {
    try {
      // Configuration de la connexion à la base de données
      const config = {
        server: this.servername,
        user: this.username,
        password: this.password,
        database: this.databaseName,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      };
      await sqlsvr.connect(config);
      return { message: `${sqlsvr} \n status: ${true}` };
    } catch (error) {
      console.log("Une erreur s'est produite :", error);
      return { message: `${error} \n status: ${false}` };
    } finally {
      sqlsvr.close();
    }
  }
}

module.exports = Company;
