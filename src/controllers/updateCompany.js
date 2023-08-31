const Company = require("../models/company");

exports.updateCompany = async (req, res, connexion) =>  {
const companyInstance = new Company(connexion);
  const inputData = req.body;

  if (
    !inputData.databaseName ||
    !inputData.servername ||
    !inputData.username ||
    !inputData.password ||
    !inputData.id 
  ) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de la compagnie à crée (id,companyName,username,databaseName,password,servername)",
    });
    return;
  } else {

   
    companyInstance.id = parseInt(inputData.id,10);
    companyInstance.username = inputData.username;
    companyInstance.databaseName = inputData.databaseName;
    companyInstance.password = inputData.password;
    companyInstance.servername = inputData.servername;
    const response = await  companyInstance.updateCompany();

    if (response) {
      res.json({
        status: "success",
        message: `La compagnie ${inputData.companyName} a été modifiée`,
      });
    } else {
      res.json({
        status: "error",
        message: `Echec de modification de la compagnie ${inputData.companyName}`,
      });
    }
  }
};
