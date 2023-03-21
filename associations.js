import Classroom from './src/models/classroomsModel.js';
import Teacher from './src/models/teachersModel.js';
import School from './src/models/schoolsModel.js';
import ClassroomTeacher from './src/models/classroomTeachersModel.js';

Classroom.belongsToMany(Teacher, {
  through: ClassroomTeacher,
  foreignKey: 'classroomId'
});
Teacher.belongsToMany(Classroom, {
  through: ClassroomTeacher,
  foreignKey: 'teacherId'
});

Classroom.belongsTo(School, {
  foreignKey: 'schoolId',
  onDelete: 'CASCADE'
});
School.hasMany(Classroom, {
  foreignKey: 'schoolId',
  onDelete: 'CASCADE'
});

export { School, Classroom, Teacher, ClassroomTeacher };
