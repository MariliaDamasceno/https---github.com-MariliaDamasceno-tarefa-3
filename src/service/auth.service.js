const Usuario = require("../model/user");
const jwt = require("jsonwebtoken");

const loginService = async (email) => {
  return await Usuario.findOne({ email });
};

const generateToken = (userId, segredo) => {
  const token = jwt.sign({ id: userId }, segredo, { expiresIn: "1h" });
  return token;
};

module.exports = {
  loginService,
  generateToken,
};
