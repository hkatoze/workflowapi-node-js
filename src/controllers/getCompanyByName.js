const Company = require("../models/company");

exports.getCompanyByName = async (req, res, connexion) => {
  const companyInstance = new Company(connexion);
  const inputData = req.body;

  if (!inputData.companyName) {
    res.json({
      message:
        "Veuillez renseigner correctement le nom de la compagnie (companyName)",
    });
    return;
  } else {
    companyInstance.companyName = inputData.companyName;

    const response = await companyInstance.getCompanyByName();

    res.json(response);
  }
};
