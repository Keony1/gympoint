import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import CurrencyInput from '~/components/CurrencyInput';
import { Container, Header, GridContainer } from './styles';
import Button from '~/components/Button';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number('A duração deve ser um número')
    .positive()
    .required(),
  price: Yup.number('O preço deve ser um número')
    .positive()
    .required('O preço é um campo obrigatório'),
});

export default function EditPlan() {
  const { id } = useParams();
  const { plan } = useSelector(state => state.plan);
  const [initialData, setInitialData] = useState();
  const [newPrice, setNewPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const [newDuration, setNewDuration] = useState();

  useMemo(() => {
    function loadPlan() {
      if (plan) {
        setInitialData({
          ...plan,
          total: plan.price * plan.duration,
        });
        setNewDuration(plan.duration);
        setNewPrice(plan.price);
      }
    }

    loadPlan();
  }, [plan]);

  useEffect(() => {
    setTotalPrice(newPrice * newDuration);
  }, [newPrice, newDuration]);

  async function handleSubmit({ title, price, duration }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        price,
        duration,
      });

      toast.success('Plano atualizado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível atualizar o plano');
    }
  }

  function handleOnChange(value) {
    setNewPrice(value);
  }

  return (
    <Container>
      <Header>
        <strong>Edição de plano</strong>

        <aside>
          <Link to="/plans">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Link>

          <Button label="SALVAR" type="submit" form="formUpdatePlan" />
        </aside>
      </Header>

      <Form
        id="formUpdatePlan"
        initialData={initialData}
        onSubmit={handleSubmit}
        schema={schema}
      >
        <label htmlFor="title">
          <p>TÍTULO DO PLANO</p>
          <Input name="title" id="title" />
        </label>
        <GridContainer>
          <div>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <Input
              type="number"
              name="duration"
              onChange={e => setNewDuration(e.target.value)}
            />
          </div>

          <div>
            <CurrencyInput
              name="price"
              label="PREÇO MENSAL"
              setChange={setNewPrice}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <CurrencyInput
              name="total"
              label="PREÇO TOTAL"
              getChange={totalPrice}
              disabled
            />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
