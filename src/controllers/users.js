import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function findAll(req, res) {
  User.findAll().then(result => res.json(result));
}

function findById(req, res) {
  User.findByPk(req.params.id).then(result => res.json(result));
}

async function addUser(req, res, next) {
  const registeredUser = await User.findOne({
    where: { username: req.body.username }
  });

  if (registeredUser !== null) {
    return res.status(409).send({ message: 'Este username já está em uso!' });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: `Erro: ${err}` });
      } else {
        User.create({
          username: req.body.username,
          password: hash
        }).then((error, result) => {
          if (error) {
            return res.status(400).send({ message: error });
          }
          return res
            .status(201)
            .send({ message: 'Usuário cadastrado com sucesso!' });
        });
      }
    });
  }
}

async function login(req, res, next) {
  const myUser = await User.findOne({
    where: { username: req.body.username }
  });

  if (myUser === null) {
    return res.status(401).send({ message: 'Usuário não encontrado!' });
  } else {
    bcrypt.compare(req.body.password, myUser.password, (err, result) => {
      if (err) {
        return res.status(401).send({ message: 'Senha incorreta' });
      } else if (result) {
        const token = jwt.sign(
          {
            username: myUser.username,
            userId: myUser.id
          },
          'SECRETKEY',
          {
            expiresIn: '1d'
          }
        );

        return res.status(200).send({
          message: 'Login feito com sucesso!',
          user: myUser.username,
          token
        });
      }
      return res.status(401).send({ message: result });
    });
  }
}

async function deleteUser(req, res) {
  await User.destroy({
    where: {
      id: req.params.id
    }
  });

  User.findAll().then(result => res.json(result));
}

export default { findAll, findById, addUser, login, deleteUser };
