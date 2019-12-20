import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { format, parseISO, differenceInMonths, addMonths } from 'date-fns';
import { Form } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import Button from '~/components/Button';
import PlansSelect from '~/components/PlansSelect';
import DatePicker from '~/components/DatePicker';
import CurrencyInput from '~/components/CurrencyInput';

import { Container, GridContainer } from './styles';

import StudentsSelect from '~/components/StudentsSelect';

import api from '~/services/api';
import history from '~/services/history';

export default function EditEnrollment() {
  const { id } = useParams();
  const { enrollment } = useSelector(state => state.enrollment);
  const [newStudent, setNewStudent] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [newPlan, setNewPlan] = useState();
  const [initialData, setInitialData] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useMemo(() => {
    if (enrollment) {
      const duration = differenceInMonths(
        new Date(enrollment.end_date),
        new Date(enrollment.start_date)
      );

      setInitialData({
        student: {
          label: enrollment.student.name,
          value: enrollment.student.id,
        },
        plan: {
          label: enrollment.plan.title,
          value: enrollment.plan.id,
        },
      });
      setStartDate(new Date(enrollment.start_date));
      setNewPlan({
        ...enrollment.plan,
        price: enrollment.price,
        duration,
      });
      setNewStudent({
        label: enrollment.student.name,
        value: enrollment.student.id,
      });
    }
  }, [enrollment]);

  async function handleSubmit({ student, plan }) {
    try {
      await api.put(`enrollments/${id}`, {
        student_id: student.value,
        plan_id: plan.value,
        start_date: startDate,
      });

      toast.success('Alteração efetuada com sucesso');
      history.push('/enrollments');
    } catch (err) {
      const { error } = err.response.data;
      if (error) {
        toast.error(
          'A data inicial da matrícula não pode ser menor que a data atual'
        );
        return;
      }
      toast.error('Não foi possível alterar a matrícula');
    }
  }

  useEffect(() => {
    if (newPlan) {
      const parsedStartDate = parseISO(format(startDate, 'yyyy-MM-dd'));
      const incrementedStartDate = addMonths(parsedStartDate, newPlan.duration);
      setEndDate(new Date(incrementedStartDate));
      setTotalPrice(newPlan.duration * newPlan.price);
    }
  }, [startDate, newPlan]);

  return (
    <Container>
      <header>
        <strong>Edição de matrícula</strong>

        <aside>
          <Link to="/enrollments">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </Link>

          <Button label="SALVAR" type="submit" form="formEditEnrollment" />
        </aside>
      </header>

      <Form
        id="formEditEnrollment"
        initialData={initialData}
        onSubmit={handleSubmit}
      >
        <StudentsSelect
          name="student"
          label="ALUNO"
          defaultValue={newStudent}
          setChange={setNewStudent}
        />

        <GridContainer>
          <div id="plansSelect">
            <PlansSelect name="plan" label="PLANO" setChange={setNewPlan} />
          </div>

          <div>
            <label htmlFor="start_date">DATA DE INICIO</label>
            <DatePicker
              name="start_date"
              setChange={setStartDate}
              getChange={startDate}
            />
          </div>

          <div>
            <label htmlFor="end_date">DATA DE TÉRMINO</label>
            <DatePicker name="end_date" getChange={endDate} disabled />
          </div>

          <div>
            <CurrencyInput
              name="total"
              label="VALOR FINAL"
              getChange={totalPrice}
              disabled
            />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
