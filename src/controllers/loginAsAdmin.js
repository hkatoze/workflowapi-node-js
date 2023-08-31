exports.loginAsAdmin = (req, res,administrators) => {
  const inputData = req.body;

  if (!inputData.email || !inputData.password) {
    res.json({
      message:
        "Veuillez renseigner correctement les informations de connexion (email, password)",
    });
    return;
  }

  let response = {
    status: "error",
    message: "Les identifiants sont incorrects.",
  };

  for (const administrator of administrators) {
    if (
      administrator.email === inputData.email &&
      administrator.password === inputData.password
    ) {
      response = {
        status: "success",
        message: "Vous êtes connecté(e).",
      };
      break;
    }
  }

  res.json(response);
};
