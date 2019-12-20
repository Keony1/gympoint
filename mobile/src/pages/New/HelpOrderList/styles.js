import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
  padding: 0 20px;
`;

export const NewHelpOrderButton = styled(Button)`
  margin: 20px 0;
`;

export const HelpOrderFlatList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 20},
})``;

export const HelpOrder = styled(RectButton)`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  padding: 20px;
`;

export const Infos = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-weight: bold;
  color: ${props => (props.answer ? '#42CB59' : '#999')};
  margin-left: 8px;
`;

export const Time = styled.Text`
  color: #999;
`;

export const Question = styled.Text`
  margin-top: 16px;
  color: #666;
  font-size: 14px;
  line-height: 26px;
  height: 78px;
`;
