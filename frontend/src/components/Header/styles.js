import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  height: 64px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    img {
      padding-right: 30px;
      margin-right: 30px;
      border-right: 1px solid #ddd;
    }
  }
`;

export const NavigationList = styled.ul`
  display: flex;
`;

export const Navigation = styled.li`
  margin-right: 20px;

  a {
    font-size: 15px;
    font-weight: bold;
    color: #999;
    transition: color 0.2s;

    &:hover {
      color: #444;
    }
  }
`;

export const Profile = styled.aside`
  span {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #666;
  }

  button {
    margin-top: 4px;
    background: none;
    border: 0;
    font-size: 14px;
    color: #de3b3b;
    transition: color 0.2s;

    &:hover {
      color: ${darken(0.08, '#de3b3b')};
    }
  }
`;
