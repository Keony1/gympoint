import styled from 'styled-components/native';

import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background: #f2f2f2;
`;

export const QuestionInput = styled(Input)`
  padding: 20px;
  margin-bottom: 20px;
`;
