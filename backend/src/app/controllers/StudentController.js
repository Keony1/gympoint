import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      email: Yup.string()
        .required()
        .email(),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists)
      return res.status(400).json({ error: 'Student already exists!' });

    const studentCreated = await Student.create(req.body);

    return res.json(studentCreated);
  }

  async index(req, res) {
    const { q: name } = req.query;

    const students = name
      ? await Student.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        })
      : await Student.findAll();

    if (!students)
      return res.status(400).json({ error: 'Student does not exists' });

    return res.json(students);
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student)
      return res.status(400).json({ error: 'Student does not exists' });

    student.destroy();

    return res.json({ success: 'Student has been deleted!' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number()
        .positive()
        .required(),
      email: Yup.string()
        .email()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const student = await Student.findByPk(req.params.id);

    if (!student)
      return res.status(400).json({ error: 'Studend does not exists' });

    const studentUpdated = await student.update(req.body);

    return res.json(studentUpdated);
  }
}

export default new StudentController();
