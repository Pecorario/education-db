import { School, Classroom, Teacher } from '../../associations.js';

const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.findAll({
      include: [
        School,
        {
          model: Teacher,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }
      ]
    });

    return res.status(200).json(classrooms);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const createClassroom = async (req, res) => {
  try {
    const { name, deskCapacity, schoolId, isBlocked, teachersIds } = req.body;

    const school = await School.findByPk(schoolId);

    if (!school) {
      return res.status(404).json({ message: 'Colégio não encontrado' });
    }

    const classroom = await Classroom.create({
      name,
      deskCapacity,
      schoolId,
      isBlocked
    });

    await classroom.addTeacher(teachersIds);

    return res.status(201).json(classroom);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const updateClassroom = async (req, res) => {
  try {
    const { name, deskCapacity, schoolId, isBlocked, teachersIds } = req.body;

    const school = await School.findByPk(schoolId);
    const classroom = await Classroom.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({ message: 'Colégio não encontrado' });
    }

    if (!classroom) {
      return res.status(404).json({ message: 'Sala de aula não encontrada' });
    }

    await classroom.setTeachers(teachersIds);
    await classroom.update({ name, deskCapacity, schoolId, isBlocked });

    return res.status(200).json({ message: 'Sala atualizada com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const rowsAffected = await Classroom.destroy({
      where: { id: req.params.id }
    });

    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Sala não encontrada.' });
    }

    return res.status(200).json({ message: 'Sala removida com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const findClassroomById = async (req, res) => {
  try {
    const id = req.params.id;

    const classroom = await Classroom.findByPk(id, {
      include: School
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Sala não encontrada.' });
    }

    return res.status(200).json(classroom);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

export default {
  getClassrooms,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  findClassroomById
};
