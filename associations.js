import Classroom from './src/models/classroomsModel.js';
import Teacher from './src/models/teachersModel.js';
import School from './src/models/schoolsModel.js';
import ClassroomTeacher from './src/models/classroomTeachersModel.js';

// Definir as associações entre os modelos
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
// Exportar os modelos com as associações definidas
export { School, Classroom, Teacher, ClassroomTeacher };
