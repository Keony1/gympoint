import React, { useState, useMemo } from 'react';
import { format, addMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import Button from '~/components/Button';
import PlansSelect from '~/components/PlansSelect';
import DatePicker from '~/components/DatePicker';

import { Container, GridContainer } from './styles';

import { formatPrice } from '~/util/formater';
import StudentsSelect from '~/components/StudentsSelect';

import api from '~/services/api';
import history from '~/services/history';

export default function RegisterEnrollment() {
  const [startDate, setStartDate] = useState();
  const [newPlan, setNewPlan] = useState();
  const [total, setTotal] = useState('');

  const end_date = useMemo(() => {
    if (startDate && newPlan) {
      setTotal(formatPrice(newPlan.duration * newPlan.price));
      return format(addMonths(startDate, newPlan.duration), 'dd/MM/yyyy');
    }
    return '';
  }, [startDate, newPlan]);

  async function handleSubmit({ student, plan, start_date }) {
    try {
      await api.post('enrollments', {
        student_id: student.value,
        plan_id: plan.value,
        start_date,
      });
      toast.success('Aluno matrículado com sucesso');
      history.push('/enrollments');
    } catch (err) {
      toast.error('Não foi possível realizar a matrícula');
    }
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de matrícula</strong>

        <aside>
          <Link to="/enrollments">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </Link>

          <Button label="SALVAR" type="submit" form="formNewEnrollment" />
        </aside>
      </header>

      <Form id="formNewEnrollment" onSubmit={handleSubmit}>
        <StudentsSelect name="student" label="ALUNO" />

        <GridContainer>
          <div id="plansSelect">
            <PlansSelect name="plan" label="PLANO" setChange={setNewPlan} />
          </div>

          <div>
            <label htmlFor="start_date">DATA DE INICIO</label>
            <DatePicker name="start_date" setChange={setStartDate} />
          </div>

          <div>
            <label htmlFor="end_date">DATA DE TÉRMINO</label>
            <Input name="end_date" value={end_date || ''} disabled />
          </div>

          <div>
            <label htmlFor="total">VALOR FINAL</label>
            <Input name="total" value={total} disabled />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
