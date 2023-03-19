import User from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de servidor', error });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de servidor', error });
  }
};

const createUser = async (req, res) => {
  try {
    const registeredUser = await User.findOne({
      where: { username: req.body.username }
    });

    if (registeredUser) {
      return res.status(409).json({ message: 'Este username já está em uso!' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de servidor', error });
  }
};

const login = async (req, res) => {
  try {
    const myUser = await User.findOne({
      where: { username: req.body.username }
    });

    if (!myUser) {
      return res.status(401).json({ message: 'Usuário não encontrado!' });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      myUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      {
        username: myUser.username,
        userId: myUser.id
      },
      'SECRETKEY',
      {
        expiresIn: '3d'
      }
    );

    return res.status(200).json({
      message: 'Login feito com sucesso!',
      user: myUser.username,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de servidor', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const rowsAffected = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno de servidor', error });
  }
};

export default { getUsers, findUserById, createUser, login, deleteUser };
