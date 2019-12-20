import Sequelize, { Model } from 'sequelize';
import { isAfter, isBefore } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              isBefore(this.start_date, new Date()) &&
              isAfter(this.end_date, new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKeu: 'student_id', as: 'student' });
  }
}

export default Enrollment;
