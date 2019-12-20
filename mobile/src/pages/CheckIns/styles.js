import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const NewCheckInButton = styled(Button)`
  margin: 20px 0;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 20},
})``;

export const Item = styled.View`
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Identifier = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;
