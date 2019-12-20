import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  border: 4px;
  margin: 30px auto 0;

  form {
    background: #fff;
    margin-top: 41px;
    border-radius: 4px;
    padding: 9px 30px 10px;

    label {
      color: #444;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      border: 1px solid #ddd;
      padding: 15px 13px;
      border-radius: 4px;
      font-size: 16px;

      &::placeholder {
        color: #999;
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
  }

  aside {
    display: flex;

    a {
      background: #ddd;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      display: flex;
      align-items: center;
      padding: 10px 16px;
      border-radius: 4px;
      margin-right: 16px;

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const GridContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  div {
    display: flex;
    flex-direction: column;
  }
`;
