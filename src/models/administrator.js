class Administrator {
  constructor(databases) {
    this.table = "administrateurs";
    this.connexion = null;
    this.id = null;
    this.email = null;
    this.password = null;
 
    if (this.connexion === null) {
      this.connexion = databases;
    }
  }

  async getAll() {
    const query = `SELECT * FROM ${this.table}`;
    return new Promise((resolve, reject) => {
      this.connexion.query(query, async (error, results) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête :", error);
          reject(error);
          return;
        }
        const formattedAdministrators = [];
        for (const administrator of results) {
          formattedAdministrators.push({
            id: administrator.id,
            email: administrator.email,
            password: administrator.password,
          });
        }
        resolve(formattedAdministrators);
      });
    })
      .then((formattedAdministrators) => {
        this.connexion.end();
        return formattedAdministrators;
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        this.connexion.end();
        return error;
      });
  }
}

module.exports = Administrator;
