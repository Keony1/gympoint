import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import Button from '~/components/Button';

import { Container } from './styles';

import api from '~/services/api';

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

export default function RegisterStudent() {
  async function handleSubmit(
    { name, email, age, weight, height },
    { resetForm }
  ) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Cliente cadastrado com sucesso!');
      resetForm();
    } catch (err) {
      toast.error('Esse e-mail já está em uso');
    }
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de alunos</strong>

        <aside>
          <Link to="/students">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            VOLTAR
          </Link>

          <Button label="SALVAR" type="submit" form="formNewStudent" />
        </aside>
      </header>

      <Form schema={schema} id="formNewStudent" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>NOME COMPLETO</p>
          <Input name="name" id="name" placeholder="John Doe" />
        </label>

        <label htmlFor="email">
          <p>ENDEREÇO DE E-MAIL</p>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </label>

        <div>
          <label htmlFor="age">
            <p>IDADE</p>
            <Input type="number" name="age" id="age" />
          </label>

          <label htmlFor="weight">
            <p>PESO (em kg)</p>
            <Input type="number" name="weight" id="weight" />
          </label>

          <label htmlFor="height">
            <p>ALTURA</p>
            <Input type="number" name="height" id="height" />
          </label>
        </div>
      </Form>
    </Container>
  );
}
