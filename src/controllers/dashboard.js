import { School, Classroom, Teacher } from '../../associations.js';

const getGeneralInfo = async (req, res) => {
  try {
    const schools = await School.findAll();
    const classrooms = await Classroom.findAll();
    const teachers = await Teacher.findAll();

    const blockedClassrooms = classrooms.filter(item => item.isBlocked);
    const unblockedClassrooms = classrooms.filter(item => !item.isBlocked);

    return res.status(200).json({
      totalSchools: schools.length,
      totalTeachers: teachers.length,
      totalClassrooms: classrooms.length,
      blockedClassrooms: blockedClassrooms.length,
      unblockedClassrooms: unblockedClassrooms.length
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const getClassroomsInfoBySchoolId = async (req, res) => {
  try {
    const classrooms = await Classroom.findAll({
      where: { schoolId: req.params.id }
    });

    const blockedClassrooms = classrooms.filter(item => item.isBlocked);
    const unblockedClassrooms = classrooms.filter(item => !item.isBlocked);

    const totalCapacity = classrooms.reduce((total, classroom) => {
      return total + classroom.deskCapacity;
    }, 0);

    return res.status(200).json({
      totalCapacity,
      blockedClassrooms: blockedClassrooms.length,
      unblockedClassrooms: unblockedClassrooms.length
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const getSchoolsData = async (req, res) => {
  try {
    const schools = await School.findAll({ include: Classroom });

    const schoolsData = schools.map(school => {
      const totalClassrooms = school.classrooms.length;
      const totalBlockedClassrooms = school.classrooms.filter(
        item => !item.isBlocked
      ).length;

      const schoolData = {
        name: school.name,
        totalClassrooms,
        totalBlockedClassrooms
      };
      return schoolData;
    });

    return res.status(200).json(schoolsData);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const getTeachersData = async (req, res) => {
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

    const teachersData = teachers.map(teacher => {
      const totalClassrooms = teacher.classrooms.length;

      const teacherData = {
        name: teacher.name,
        designedClassrooms: totalClassrooms
      };
      return teacherData;
    });

    return res.status(200).json(teachersData);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

export default {
  getGeneralInfo,
  getClassroomsInfoBySchoolId,
  getSchoolsData,
  getTeachersData
};
