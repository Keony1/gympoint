import styled from 'styled-components/native';

export const Container = styled.View`
  /* height: 46px; */
  background: #fff;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 20px;
`;
