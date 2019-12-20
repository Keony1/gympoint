import React, {useState, useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '~/components/Header';

import {Container, NewCheckInButton, Item, Identifier, Time} from './styles';

import api from '~/services/api';
import dateParserRelative from '~/utils/dateParserRelative';

export default function CheckIns() {
  const studentId = useSelector(state => state.auth.id);
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    async function loadCheckIns() {
      const response = await api.get(`students/${studentId}/checkins`);

      const formatedCheckin = response.data
        .map((checkIn, index) => ({
          ...checkIn,
          index: index + 1,
          parsedDate: dateParserRelative(checkIn.createdAt),
        }))
        .reverse();

      setCheckIns(formatedCheckin);
    }
    loadCheckIns();
  }, []); // eslint-disable-line

  async function handleOnPress() {
    try {
      const response = await api.post(`students/${studentId}/checkins`);

      const newCheckIn = {
        ...response.data,
        parsedDate: dateParserRelative(response.data.createdAt),
        index: 1,
      };

      setCheckIns([...checkIns, newCheckIn]);
    } catch (err) {
      Alert.alert('Limite de check-ins por semana estourado!');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <NewCheckInButton onPress={handleOnPress}>
          Novo check-in
        </NewCheckInButton>

        <FlatList
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Item>
              <Identifier>Check-in #{item.index}</Identifier>
              <Time>{item.parsedDate}</Time>
            </Item>
          )}
        />
      </Container>
    </>
  );
}
