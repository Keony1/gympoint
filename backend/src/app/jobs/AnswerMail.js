import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder, answer, updatedHelpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.Student.name} <${helpOrder.Student.email}>`,
      subject: 'Reposta da sua pergunta',
      template: 'answer',
      context: {
        student: updatedHelpOrder.Student.name,
        question: updatedHelpOrder.question,
        answer,
        answerAt: format(
          parseISO(updatedHelpOrder.answer_at),
          "'Dia' dd 'de' MMMM",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
