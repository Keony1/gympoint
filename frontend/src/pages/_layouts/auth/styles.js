import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;

  img {
    width: 153px;
    height: 100px;
  }

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #444;
      font-size: 14px;

      input {
        height: 45px;
        border: 1px solid #ddd;
        padding: 13px 15px;
        border-radius: 4px;
        margin: 8px 0 20px;

        &::placeholder {
          color: #999;
          font-size: 16px;
        }
      }
    }

    button {
      background: #ee4d64;
      height: 45px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
