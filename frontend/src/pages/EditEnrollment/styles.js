import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 34px auto 0;

  header {
    display: flex;
    justify-content: space-between;

    strong {
      font-size: 24px;
      color: #444;
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
      }
    }
  }

  form {
    background: #fff;
    margin-top: 41px;
    border-radius: 4px;
    padding: 9px 30px 10px;
    /* display: flex;
    flex-direction: column; */

    label {
      font-size: 14px;
      color: #444;
      font-weight: bold;
      margin-bottom: 8px;
    }

    input {
      border-radius: 4px;
      border: 1px solid #ddd;
      width: 100%;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin-top: 15px;

  div {
    input {
      height: 45px;
      text-indent: 15px;
    }
  }

  div.react-datepicker-wrapper {
    width: 100%;
  }

  > div#plansSelect {
    input {
      max-height: 32px;
    }
  }
`;
