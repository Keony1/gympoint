import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({ where: { student_id: id } });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const { id: questionId, createdAt } = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json({
      id: questionId,
      question,
      createdAt,
    });
  }
}

export default new HelpOrderController();
