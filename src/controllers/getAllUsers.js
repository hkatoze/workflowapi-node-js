const User = require("../models/user");

exports.getAllUsers = async (req, res, connexion) => {
  const userInstance = new User(connexion);
  const inputData = req.body;

  if (!inputData.companyName) {
    res.json({
      message:
        "Veuillez renseigner correctement le nom de la compagnie (companyName)",
    });
    return;
  } else {
    userInstance.companyName = inputData.companyName;

    const response = await userInstance.getAllUsers();

    res.json(response);
  }
};
