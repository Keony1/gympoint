import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res
        .status(400)
        .json({ error: 'Plan with this title already exists' });
    }

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, duration, price } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists' });
    }

    const updatedPlan = await plan.update({ title, duration, price });

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    await Plan.destroy({ where: { id } });

    return res.status(200).json({ message: 'Plan removed' });
  }
}

export default new PlanController();
