import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

import AnswerMail from '../jobs/AnswerMail';

class AnswerController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({ where: { answer: null } });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findOne({
      where: { id },
      include: {
        model: Student,
        attributes: ['name', 'email'],
      },
    });

    if (helpOrder.answer !== null) {
      return res
        .status(400)
        .json({ error: 'This question are already been answered' });
    }

    const updatedHelpOrder = await helpOrder.update({ answer });

    await Queue.add(AnswerMail.key, {
      helpOrder,
      updatedHelpOrder,
      answer,
    });

    return res.json({
      id,
      answer,
    });
  }
}

export default new AnswerController();
