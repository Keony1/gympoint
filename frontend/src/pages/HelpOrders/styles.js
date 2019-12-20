import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 34px auto 0;

  strong {
    color: #444;
    font-size: 24px;
  }
`;

export const HelpOrdersTable = styled.table`
  width: 100%;
  padding: 30px;
  margin-top: 24px;
  background: #fff;
  border-radius: 4px;
  border-spacing: 0;

  thead th {
    font-size: 16px;
    font-weight: bold;
    color: #444;
    text-align: left;
  }

  tbody td {
    padding: 20px 0;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #eee;

    &:nth-child(2) {
      text-align: right;
    }

    button {
      background: none;
      border: none;
      color: #4d85ee;
      font-size: 15px;
    }
  }
`;

export const WrapperModal = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 26px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      border: 1px solid #ddd;
      height: 127px;
      margin-bottom: 21px;
      padding: 13px 15px;
      color: #999;
    }

    button {
      background: #ee4d64;
      border: none;
      color: #fff;
      padding: 13px 134px;
    }
  }
`;
