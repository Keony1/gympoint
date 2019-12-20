import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  border: 4px;
  margin: 30px auto 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  strong {
    font-size: 24px;
    font-weight: bold;
  }

  aside {
    display: flex;
    align-items: center;

    a {
      background: #de3b3b;
      font-size: 14px;
      font-weight: bold;
      padding: 10px 16px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-right: 16px;

      svg {
        margin-right: 16px;
      }
    }
  }
`;

export const StudentsTable = styled.table`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  border-spacing: 0;

  thead th {
    text-align: left;
    color: #444;
    font-weight: bold;
    font-size: 16px;

    &:nth-child(3) {
      text-align: center;
    }
  }

  tbody td {
    padding: 20px 0;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid #eee;

    &:nth-child(3) {
      text-align: center;
    }

    &:nth-child(4) {
      text-align: center;
    }

    div {
      button {
        background: none;
        border: 0;
        font-size: 15px;
      }

      a {
        color: #4d85ee;
        margin-right: 25px;
        transition: color 0.2s;

        &:hover {
          color: ${darken(0.1, '#4d85ee')};
        }
      }

      button#delete {
        color: #de3b3b;
        transition: color 0.2s;

        &:hover {
          color: ${darken(0.1, '#de3b3b')};
        }
      }
    }
  }
`;
