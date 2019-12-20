import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Container, Header, PlansTable } from './styles';
import { setPlanInfo } from '~/store/modules/plan/actions';
import { formatPrice } from '~/util/formater';
import api from '~/services/api';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  async function handleDeletePlan(id) {
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir esse plano?'
    );

    if (confirm) {
      try {
        await api.delete(`/plans/${id}`);
        setPlans(plans.filter(plan => plan.id !== id));
      } catch (err) {
        toast.error('Não foi possível deletar o plano.');
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando planos</strong>

        <aside>
          <Link to="/register-plan">
            <MdAdd size={20} />
            CADASTRAR
          </Link>
        </aside>
      </Header>

      <PlansTable>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.duration + (plan.duration > 1 ? ' Meses' : ' Mês')}</td>
              <td>{formatPrice(plan.price)}</td>
              <td>
                <div>
                  <Link
                    to={`/plans/${plan.id}`}
                    onClick={() => dispatch(setPlanInfo(plans, plan.id))}
                  >
                    editar
                  </Link>
                  <button
                    type="button"
                    id="delete"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    apagar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </PlansTable>
    </Container>
  );
}
