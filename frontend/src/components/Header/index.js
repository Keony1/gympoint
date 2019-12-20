import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, NavigationList, Navigation, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import horizontalLogo from '~/assets/horizontal-logo.svg';

export default function Header() {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div>
        <img src={horizontalLogo} alt="Gympoint" />

        <nav>
          <NavigationList>
            <Navigation>
              <NavLink to="/students" activeStyle={{ color: 'black' }}>
                ALUNOS
              </NavLink>
            </Navigation>
            <Navigation>
              <NavLink to="/plans" activeStyle={{ color: 'black' }}>
                PLANOS
              </NavLink>
            </Navigation>
            <Navigation>
              <NavLink to="/enrollments" activeStyle={{ color: 'black' }}>
                MATRÍCULAS
              </NavLink>
            </Navigation>
            <Navigation>
              <NavLink to="/help-orders" activeStyle={{ color: 'black' }}>
                PEDIDOS DE AUXÍLIO
              </NavLink>
            </Navigation>
          </NavigationList>
        </nav>
      </div>

      <Profile>
        <span>{user.name}</span>

        <button type="button" onClick={handleClick}>sair do sistema</button>
      </Profile>
    </Container>
  );
}
