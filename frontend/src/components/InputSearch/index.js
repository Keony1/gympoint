import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function InputSearch({ event }) {
  return (
    <Container>
      <MdSearch size={20} color="#999" />
      <input
        type="text"
        onChange={e => event(e.target.value)}
        placeholder="Buscar aluno"
      />
    </Container>
  );
}
