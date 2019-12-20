import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';

import { setStudentInfo } from '~/store/modules/student/actions';

import { Container, Header, StudentsTable } from './styles';

import InputSearch from '~/components/InputSearch';

import api from '~/services/api';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  /**
   * Component did mount
   */
  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  async function handleInputChange(name) {
    const response = await api.get('students', {
      params: { q: name },
    });

    setStudents(response.data);
  }

  async function handleDeleteStudent(id) {
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir o aluno?'
    );
    if (confirm) {
      try {
        await api.delete(`students/${id}`);

        setStudents(students.filter(student => student.id !== id));

        toast.success('Cliente exluído com sucesso');
      } catch (err) {
        const { error } = err.reponse.data;

        if (error) {
          toast.error('Esse cliente já foi excluído');
        } else {
          toast.error('Falha ao excluir. Tente novamente mais tarde');
        }
      }
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando alunos</strong>

        <aside>
          <Link to="/register-student">
            <MdAdd size={20} />
            CADASTRAR
          </Link>

          <InputSearch event={handleInputChange} />
        </aside>
      </Header>

      <StudentsTable>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <div>
                  <Link
                    to={`/students/${student.id}`}
                    onClick={() =>
                      dispatch(setStudentInfo(students, student.id))
                    }
                  >
                    editar
                  </Link>
                  <button
                    type="button"
                    id="delete"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    apagar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
