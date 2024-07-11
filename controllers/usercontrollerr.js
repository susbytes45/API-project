const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "sucess",
    data: {
      users: "users",
    },
  });
};
const createUser = (req, res) => {
  res.status(201).json({
    status: "sucess",
    data: {
      newuser: "user",
    },
  });
};
const getUser = (req, res) => {
  res.status(500).json({ status: "route not implemented yet" });
};
const deleteuser = (req, res) => {
  res.status(500).json({ status: "route not implemented yet" });
};
const updateuser = (req, res) => {
  res.status(500).json({ status: "route not implemented yet" });
};
module.exports = { getAllUsers, createUser, getUser, deleteuser, updateuser };
