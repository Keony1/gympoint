import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  NewHelpOrderButton,
  HelpOrderFlatList,
  HelpOrder,
  Infos,
  QuestionHeader,
  StatusText,
  Time,
  Question,
} from './styles';

import api from '~/services/api';
import dateParserRelative from '~/utils/dateParserRelative';

function HelpOrderList({navigation, isFocused}) {
  const studentId = useSelector(state => state.auth.id);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${studentId}/help-orders`);

      setHelpOrders(
        response.data
          .map(helpOrder => ({
            ...helpOrder,
          questionFormated: `${helpOrder.question.slice(0, 90) + (helpOrder.question.length > 90 ? '...' : '')}`, //eslint-disable-line
            createdAtFormated: dateParserRelative(helpOrder.createdAt),
            isAnswered: helpOrder.answer ? 'Respondido' : 'Sem resposta',
          }))
          .reverse(),
      );
    }
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleOnPress() {
    navigation.navigate('NewHelpOrder', {});
  }

  function handlerNavigation(helpOrder) {
    navigation.navigate('HelpOrder', {helpOrder});
  }

  return (
    <Container>
      <NewHelpOrderButton onPress={handleOnPress}>
        Novo pedido de auxílio
      </NewHelpOrderButton>

      <HelpOrderFlatList
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <HelpOrder onPress={() => handlerNavigation(item)}>
            <Infos>
              <QuestionHeader>
                <Icon
                  name="check-circle"
                  size={20}
                  color={item.answer ? '#42CB59' : '#999999'}
                />

                <StatusText answer={item.answer}>{item.isAnswered}</StatusText>
              </QuestionHeader>

              <Time>{item.createdAtFormated}</Time>
            </Infos>
            <Question>{item.questionFormated}</Question>
          </HelpOrder>
        )}
      />
    </Container>
  );
}

HelpOrderList.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CheckIns');
      }}>
      <Icon name="chevron-left" size={20} color="#000" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(HelpOrderList);
