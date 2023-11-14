const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const findByIdUser = async (id) => {
  return User.findById(id);
};

const findByEmail = async (email) => {
  return User.findOne({ email: email });
}

const findAllUsers = async () => {
  return User.find();
};

const createUser = async (user) => {
  return User.create(user);
};

const updateUser = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: true });
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const generateToken = (userId, segredo) => {
  const token = jwt.sign({ id: userId }, segredo, { expiresIn: "1h" });
  return token;
};


module.exports = {
  findByIdUser,
  findByEmail,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  generateToken
  };
