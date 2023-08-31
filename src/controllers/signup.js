const User = require("../models/user");

exports.signup = async (req, res, connexion) => {
  const userInstance = new User(connexion);
  const inputData = req.body;

  if (
    !inputData.companyName ||
    !inputData.emailAdd ||
    !inputData.username ||
    !inputData.department ||
    !inputData.grade ||
    !inputData.password ||
    !inputData.maxAmount
  ) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de création de compte (companyName,emailAdd,username,department,grade,password,maxAmount)",
    });
    return;
  } else {
    userInstance.companyName = inputData.companyName;
    userInstance.emailAdd = inputData.emailAdd;
    userInstance.username = inputData.username;
    userInstance.department = inputData.department;
    userInstance.grade = inputData.grade;
    userInstance.password = inputData.password;
    userInstance.maxAmount = inputData.maxAmount;
    const response =  await userInstance.signup();
    if (response) {
      res.json({ data_inserted: true, message: "success" });
    } else {
      res.json({ data_inserted: false, message: "already registered." });
    }
  }
};
