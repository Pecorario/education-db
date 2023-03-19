import School from '../models/schoolsModel.js';

function findAll(req, res) {
  School.findAll().then(result => res.json(result));
}

function findById(req, res) {
  School.findByPk(req.params.id).then(result => res.json(result));
}

async function addSchool(req, res) {
  try {
    const response = await School.create({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      symbol: req.body.symbol
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

async function updateSchool(req, res) {
  await School.update(
    {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      symbol: req.body.symbol
    },
    {
      where: {
        id: req.params.id
      }
    }
  );

  School.findByPk(req.params.id).then(result => res.json(result));
}

async function deleteSchool(req, res) {
  await School.destroy({
    where: {
      id: req.params.id
    }
  });

  School.findAll().then(result => res.json(result));
}

export default { findAll, findById, addSchool, updateSchool, deleteSchool };
