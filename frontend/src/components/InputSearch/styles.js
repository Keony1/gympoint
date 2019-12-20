import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  input {
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 10px 10px 10px 40px;
    color: #999;
    width: 237px;
    background: #fff;

    &::placeholder {
      color: #999;
    }
  }

  svg {
    position: absolute;
    top: 10px;
    left: 15px;
    cursor: pointer;
  }
`;
