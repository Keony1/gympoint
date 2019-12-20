import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import {signInSuccess, signFailure} from './actions';

import api from '~/services/api';

export function* signIn({payload}) {
  try {
    const {id} = payload;

    yield call(api.get, `students/${id}/checkins`);

    api.defaults.headers.studentId = `${id}`;

    yield put(signInSuccess(id));

    // history.push('/CheckIns');
  } catch (err) {
    Alert.alert('Esse id de aluno não existe');
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
