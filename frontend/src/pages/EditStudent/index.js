import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { Container, Header, GridContainer } from './styles';
import Button from '~/components/Button';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .positive('A idade deve ser um número positivo')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .positive('O peso deve ser um número positivo')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .positive('A altura deve ser um número positivo')
    .required('A altura é obrigatória'),
});

export default function EditStudent() {
  const { id } = useParams();
  const { student } = useSelector(state => state.student);
  const [initialData, setInitialData] = useState();

  useMemo(() => {
    if (student) {
      setInitialData(student);
    }
  }, [student]);

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.put(`students/${id}`, {
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Aluno atualizado com sucesso!');
      history.push('/students');
    } catch (err) {
      const { error } = err.response.data;
      if (error) {
        toast.error('Todos os campos são obrigatórios');
      } else {
        toast.error('Erro ao editar o aluno');
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Edição de aluno</strong>

        <aside>
          <Link to="/students">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Link>

          <Button label="SALVAR" type="submit" form="formUpdateStudent" />
        </aside>
      </Header>

      <Form
        id="formUpdateStudent"
        schema={schema}
        initialData={initialData}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">NOME COMPLETO</label>
        <Input name="name" id="name" />

        <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
        <Input type="email" name="email" id="email" />

        <GridContainer>
          <div>
            <label htmlFor="age">IDADE</label>
            <Input type="number" name="age" id="age" />
          </div>
          <div>
            <label htmlFor="weight">PESO (em kg)</label>
            <Input type="number" step=".001" name="weight" id="weight" />
          </div>

          <div>
            <label htmlFor="height">ALTURA</label>
            <Input type="number" step=".001" name="height" id="height" />
          </div>
        </GridContainer>
      </Form>
    </Container>
  );
}
