import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Container, Header, EnrollmentsTable } from './styles';

import { setEnrollment } from '~/store/modules/enrollment/actions';

import api from '~/services/api';

export default function Enrollments() {
  const dispatch = useDispatch();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('/enrollments');

      const formatedEnrollments = response.data.map(enrollment => ({
        ...enrollment,
        formatedStartDate: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        formatedEndDate: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          { locale: pt }
        ),
        isActive: enrollment.active ? 'Ativo' : 'Não ativo',
      }));

      setEnrollments(formatedEnrollments);
    }

    loadEnrollments();
  }, []);

  async function handleDeleteEnrollment(id) {
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir essa matrícula?'
    );

    if (confirm) {
      try {
        await api.delete(`enrollments/${id}`);

        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));

        toast.success('Matrícula excluída com sucesso');
      } catch (err) {
        toast.error('Falha ao excluir. Tente novamente mais tarde');
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando matrículas</strong>

        <aside>
          <Link to="/register-enrollment">
            <MdAdd size={20} />
            CADASTRAR
          </Link>
        </aside>
      </Header>

      <EnrollmentsTable>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.plan.title}</td>
              <td>{enrollment.formatedStartDate}</td>
              <td>{enrollment.formatedEndDate}</td>
              <td>{enrollment.isActive}</td>
              <td>
                <div>
                  <Link
                    to={`/enrollments/${enrollment.id}`}
                    onClick={() =>
                      dispatch(setEnrollment(enrollments, enrollment.id))
                    }
                  >
                    editar
                  </Link>
                  <button
                    type="button"
                    id="delete"
                    onClick={() => handleDeleteEnrollment(enrollment.id)}
                  >
                    apagar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </EnrollmentsTable>
    </Container>
  );
}
