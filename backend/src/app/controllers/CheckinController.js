import { startOfWeek, endOfWeek } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findOne({ where: { id } });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.findAll({ where: { student_id: id } });
    // .sort({ created_at: 'desc' })
    // .limit(20);

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const limitOfCheckins = 5;

    const currentDate = new Date();

    const currentStartOfWeek = startOfWeek(currentDate);

    const currentEndOfWeek = endOfWeek(currentDate);

    const pastCheckins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [currentStartOfWeek, currentEndOfWeek],
        },
      },
      limit: 5,
    });

    if (pastCheckins.length >= limitOfCheckins) {
      return res.status(401).json({ error: 'Five checkins allowed per week' });
    }

    const checkin = await Checkin.create({
      student_id: id,
      created_at: currentDate,
      updated_at: null,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
