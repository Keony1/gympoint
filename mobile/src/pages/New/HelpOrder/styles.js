import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
  padding: 22px 20px;
`;

export const HelpOrderItem = styled.View`
  border: 1px solid #ddd;
  padding: 20px;
  background: #fff;
`;

export const Label = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const LabelText = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const HelpOrderText = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #666;
  margin-bottom: 20px;
`;
