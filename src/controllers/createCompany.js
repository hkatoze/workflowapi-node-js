const Company = require("../models/company");

exports.createCompany = async (req, res, connexion) => {

  const companyInstance = new Company(connexion);
  const inputData = req.body;

  if (
    !inputData.backgroundColor ||
    !inputData.companyName ||
    !inputData.username ||
    !inputData.databaseName ||
    !inputData.password ||
    !inputData.servername
  ) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de la compagnie à crée (backgroundColor,companyName,username,databaseName,password,servername)",
    });
    return;
  } else {
 
    companyInstance.backgroundColor = inputData.backgroundColor;
    companyInstance.companyName = inputData.companyName;
    companyInstance.username = inputData.username;
    companyInstance.databaseName = inputData.databaseName;
    companyInstance.password = inputData.password;
    companyInstance.servername = inputData.servername;
    const response = await companyInstance.createCompany();
    res.json(response);
  }
};
