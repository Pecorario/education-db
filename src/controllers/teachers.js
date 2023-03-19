import { Teacher, Classroom } from '../../associations.js';

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: Classroom,
        attributes: ['id', 'name', 'schoolId'],
        through: {
          attributes: []
        }
      }
    });

    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { name } = req.body;

    await Teacher.create({ name });

    res.status(201).json({ message: 'Professor criado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const rowsAffected = await Teacher.update({ name }, { where: { id } });

    if (rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    return res
      .status(200)
      .json({ message: 'Professor atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const rowsAffected = await Teacher.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    return res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

export default {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
