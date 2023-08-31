const Requisition = require("../models/requisition");

exports.validateRequisition = async (req, res, connexion) => {
  const requisitionInstance = new Requisition(connexion);
  const inputData = req.body;

  if (!inputData.companyName || !inputData.onhold || !inputData.reqNumber) {
    res.json({
      message:
        "Veuillez renseigner correctement les paramètres (companyName,onhold,reqNumber)",
    });
    return;
  } else {
    requisitionInstance.companyName = inputData.companyName;
    requisitionInstance.ONHOLD = inputData.onhold;
    requisitionInstance.RQNNUMBER = inputData.reqNumber;

    const response = await requisitionInstance.validateRequisition();

    if (response == 0) {
      res.json({
        status: "error",
        message: "Aucune requisition correspondante n'a été trouvée.",
      });
    } else if (response == 1) {
      res.json({
        status: "success",
        message: "Le statut de la requisition a été modifié avec succès.",
      });
    }else if (response == 2) {
      res.json({
        status: "error",
        message: "Impossible de se connecter à la base de données de "+inputData.companyName,
      });
    } else {
      res.json({
        status: "error",
        message: "Erreur lors de la mise à jour de la requisition",
      });
    }

    
  }
};
