const Requisition = require("../models/requisition");

exports.getRequisitions = async (req, res, connexion) => {
  const requisitionInstance = new Requisition(connexion);
  const inputData = req.body;

  if (!inputData.companyName || !inputData.department || !inputData.maxAmount) {
    res.json({
      message:
        "Veuillez renseigner correctement les paramètres de reccupérations des réquisitions (companyName,department,maxAmount)",
    });
    return;
  } else {
    requisitionInstance.companyName = inputData.companyName;
    requisitionInstance.department = inputData.department;
    requisitionInstance.maxAmount = inputData.maxAmount;


    const response = await requisitionInstance.getRequisitions();

    res.json(response);
  }
};
