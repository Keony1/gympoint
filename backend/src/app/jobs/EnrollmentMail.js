import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student, end_date, plan, total } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Realizada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        date_end: format(parseISO(end_date), "'Dia' dd 'de' MMMM", {
          locale: pt,
        }),
        price: plan.price,
        total,
      },
    });
  }
}

export default new EnrollmentMail();
