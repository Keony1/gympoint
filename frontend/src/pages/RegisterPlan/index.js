import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { Container, GridContainer } from './styles';
import Button from '~/components/Button';

import CurrencyInput from '~/components/CurrencyInput';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/formater';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('É obrigatório uma duração para o plano'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function RegisterPlan() {
  const [total, setTotal] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDuration, setNewDuration] = useState('');

  useEffect(() => {
    if (newPrice && newDuration) {
      setTotal(formatPrice(newPrice * newDuration));
    } else {
      setTotal('');
    }
  }, [newPrice, newDuration]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });
      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Erro ao cadastrar o plano');
    }
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de planos</strong>

        <aside>
          <Link to="/plans">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </Link>

          <Button label="SALVAR" type="submit" form="formNewPlan" />
        </aside>
      </header>

      <Form id="formNewPlan" schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="title">TÍTULO DO PLANO</label>
        <Input name="title" id="title" />

        <GridContainer>
          <div>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <Input
              type="number"
              name="duration"
              id="duration"
              value={newDuration}
              onChange={event => setNewDuration(event.target.value)}
            />
          </div>

          <div>
            <CurrencyInput
              label="PREÇO MENSAL"
              name="price"
              setChange={setNewPrice}
            />
          </div>

          <div>
            <label htmlFor="total">PREÇO TOTAL</label>
            <Input value={total} name="total" disabled />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
