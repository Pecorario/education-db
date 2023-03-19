import { School, Classroom } from '../../associations.js';

const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll({ include: Classroom });

    return res.status(200).json(schools);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const createSchool = async (req, res) => {
  try {
    const { name, city, state, symbol } = req.body;

    const school = await School.create({
      name,
      city,
      state,
      symbol
    });

    return res.status(201).json(school);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const updateSchool = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, city, state, symbol } = req.body;

    const rowsAffected = await School.update(
      { name, city, state, symbol },
      { where: { id }, include: Classroom }
    );

    if (rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Colégio não encontrado.' });
    }

    return res.status(200).json({ message: 'Colégio atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const id = req.params.id;

    const rowsAffected = await School.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Colégio não encontrado.' });
    }

    return res.status(200).json({ message: 'Colégio removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const findSchoolById = async (req, res) => {
  const id = req.params.id;

  try {
    const school = await School.findByPk(id, {
      include: { model: Classroom, as: 'classrooms' }
    });

    if (!school) {
      return res.status(404).json({ message: 'Colégio não encontrado.' });
    }

    return res.status(200).json(school);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

export default {
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool,
  findSchoolById
};
