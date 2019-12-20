import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, QuestionInput} from './styles';
import Button from '~/components/Button';

import api from '~/services/api';

export default function NewHelpOrder({navigation}) {
  const studentId = useSelector(state => state.auth.id);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`students/${studentId}/help-orders`, {
        question,
      });
      Alert.alert('Pergunta cadastrada com sucesso!');
      navigation.navigate('HelpOrderList');
    } catch (err) {
      console.tron.log(err);
      Alert.alert('Houve um erro ao cadastrar sua pergunta');
    }
  }

  return (
    <Container>
      <QuestionInput
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="grey"
        placeholder="Inclua seu pedido de auxílio"
        numberOfLines={9}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        multiline
        textAlignVertical="top"
        value={question}
        onChangeText={setQuestion}
      />

      <Button onPress={handleSubmit}>Enviar pedido</Button>
    </Container>
  );
}

NewHelpOrder.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrderList');
      }}>
      <Icon name="chevron-left" size={20} color="#000" />
    </TouchableOpacity>
  ),
});
