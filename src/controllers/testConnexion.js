const Company = require("../models/company");

exports.testConnexion = async (req, res, connexion) => {
  const companyInstance = new Company(connexion);
  const inputData = req.body;

  if (
    !inputData.databaseName ||
    !inputData.servername ||
    !inputData.username ||
    !inputData.password ||
    !inputData.companyName
  ) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de la compagnie à crée (companyName,username,databaseName,password,servername)",
    });
    return;
  } else {
    companyInstance.username = inputData.username;
    companyInstance.databaseName = inputData.databaseName;
    companyInstance.password = inputData.password;
    companyInstance.servername = inputData.servername;
    const response = await companyInstance.testConnexion();
    res.json(response);
  }
};
