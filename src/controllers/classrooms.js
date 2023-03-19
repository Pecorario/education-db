import Classroom from '../models/classroomsModel.js';

function findAll(req, res) {
  Classroom.findAll().then(result => res.json(result));
}

function findById(req, res) {
  Classroom.findByPk(req.params.id).then(result => res.json(result));
}

async function addClassroom(req, res) {
  try {
    const response = await Classroom.create({
      name: req.body.name,
      deskCapacity: req.body.deskCapacity,
      isBlocked: req.body.isBlocked,
      schoolId: req.body.schoolId
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

async function updateClassroom(req, res) {
  await Classroom.update(
    {
      name: req.body.name,
      deskCapacity: req.body.deskCapacity,
      isBlocked: req.body.isBlocked,
      schoolId: req.body.schoolId
    },
    {
      where: {
        id: req.params.id
      }
    }
  );

  Classroom.findByPk(req.params.id).then(result => res.json(result));
}

async function deleteClassroom(req, res) {
  await Classroom.destroy({
    where: {
      id: req.params.id
    }
  });

  Classroom.findAll().then(result => res.json(result));
}

export default {
  findAll,
  findById,
  addClassroom,
  updateClassroom,
  deleteClassroom
};
