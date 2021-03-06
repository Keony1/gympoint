import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';

import {signInRequest} from '~/store/modules/auth/actions';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState(null);

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(studentId));
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="numeric"
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
