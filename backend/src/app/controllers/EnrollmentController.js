import { parseISO, addMonths, isBefore } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findOne({ where: { id: student_id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findOne({ where: { id: plan_id } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const total = plan.price * plan.duration;

    const date = parseISO(start_date);

    const end_date = addMonths(date, plan.duration);

    Enrollment.create({
      student_id,
      plan_id,
      start_date: date,
      end_date,
      price: total,
    });

    await Queue.add(EnrollmentMail.key, {
      student,
      end_date,
      plan,
      total,
    });

    return res.json({
      student_id,
      plan_id,
      start_date: date,
      end_date,
      price: total,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const parsedStartDate = parseISO(start_date);
    /**
     * Verify if start_date parsed are less than current date
     */
    if (isBefore(parsedStartDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'Start date cannot be less than current date' });
    }

    const enrollment = await Enrollment.findOne({
      where: { id },
      attributes: ['id', 'student_id', 'plan_id', 'start_date', 'price'],
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    const plan = await Plan.findOne({ where: { id: plan_id } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const end_date = addMonths(parsedStartDate, plan.duration);

    const price = plan.price * plan.duration;

    await enrollment.update({
      student_id,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price,
    });

    return res.json({
      student_id,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ erro: 'Enrollment does not exists' });
    }

    await enrollment.destroy();

    return res.status(200).json({ message: 'Enrollment removed!' });
  }
}

export default new EnrollmentController();
