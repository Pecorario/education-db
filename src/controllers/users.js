import User from '../models/usersModel.js';

function findAll(req, res) {
  User.findAll().then(result => res.json(result));
}

function findById(req, res) {
  User.findByPk(req.params.id).then(result => res.json(result));
}

function addUser(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(result => res.json(result));
}

async function updateUser(req, res) {
  await User.update(
    {
      username: req.body.username,
      password: req.body.password
    },
    {
      where: {
        id: req.params.id
      }
    }
  );

  User.findByPk(req.params.id).then(result => res.json(result));
}

async function deleteUser(req, res) {
  await User.destroy({
    where: {
      id: req.params.id
    }
  });

  User.findAll().then(result => res.json(result));
}

export default { findAll, findById, addUser, updateUser, deleteUser };
