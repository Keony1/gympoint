import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  HelpOrderItem,
  Label,
  LabelText,
  Time,
  HelpOrderText,
} from './styles';

export default function HelpOrder({navigation}) {
  const {helpOrder} = navigation.state.params;

  return (
    <Container>
      <HelpOrderItem>
        <Label>
          <LabelText>PERGUNTA</LabelText>
          <Time>{helpOrder.createdAtFormated}</Time>
        </Label>
        <HelpOrderText>{helpOrder.question}</HelpOrderText>
        {helpOrder.answer && (
          <>
            <Label>
              <LabelText>RESPOSTA</LabelText>
            </Label>
            <HelpOrderText>{helpOrder.answer}</HelpOrderText>
          </>
        )}
      </HelpOrderItem>
    </Container>
  );
}

HelpOrder.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrderList');
      }}>
      <Icon name="chevron-left" size={20} color="#000" />
    </TouchableOpacity>
  ),
});
