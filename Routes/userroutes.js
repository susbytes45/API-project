const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  deleteuser,
  updateuser,
} = require('./../controllers/usercontrollerr');
const { signup } = require('./../controllers/authcontroller');
const tourrouter = express.Router();
tourrouter.route('/signup').post(signup);
tourrouter.route('/').get(getAllUsers).post(createUser);
tourrouter.route('/:id').get(getUser).delete(deleteuser).patch(updateuser);
module.exports = tourrouter;
