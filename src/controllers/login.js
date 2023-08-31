const User = require("../models/user");

exports.login = async (req, res, connexion) => {
  const userInstance = new User(connexion);
  const inputData = req.body;

  if (!inputData.companyName || !inputData.emailAdd || !inputData.password) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de connexion (companyName,emailAdd,password)",
    });
    
  } else {
    userInstance.companyName = inputData.companyName;
    userInstance.emailAdd = inputData.emailAdd;
    userInstance.password = inputData.password;

    const response = await userInstance.login();
    if (response.code == 0) {
      res.json({ user_exists: false, message: "L'utilisateur n'existe pas." });
    } else if (response.code == 1) {
      res.json({
        user_exists: true,
        message: "Authentification réussie.",
        user: response.user,
      });
    } else if (response.code == 2) {
      res.json({
        user_exists: true,
        message: "Mot de passe incorrect.",
      });
    } else {
      res.json({
        message: "Erreur de connexion à base de donnée",
      });
    }
  }
};
