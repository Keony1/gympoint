import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, HelpOrdersTable, WrapperModal } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
  helpOrderId: Yup.number().required('É necessário o id da pergunta'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalHelpOrder, setModalHelpOrder] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders');
      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, [isAnswered]);

  function handleOnRequestClose() {
    setShowModal(false);
  }

  function handleOnClick(helpOrderId) {
    setModalHelpOrder(
      helpOrders.find(helpOrder => helpOrder.id === helpOrderId)
    );

    setShowModal(true);
  }

  async function handleOnSubmit({ answer, helpOrderId }) {
    try {
      await api.put(`/help-orders/${helpOrderId}/answer`, {
        answer,
      });
      toast.success('Pergunta respondida com sucesso');
      setIsAnswered(true);
    } catch (err) {
      toast.error('Não foi possível responder a essa pergunta');
    }
    setShowModal(false);
  }

  return (
    <Container>
      <strong>Pedidos de auxílio</strong>

      <HelpOrdersTable>
        <thead>
          <tr>
            <th>ALUNO</th>
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <td>{helpOrder.question}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleOnClick(helpOrder.id)}
                >
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </HelpOrdersTable>

      <ReactModal
        isOpen={showModal}
        shouldCloseOnEsc
        onRequestClose={handleOnRequestClose}
        style={{
          content: {
            top: '25%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width: '450px',
            transform: 'translate(-50%, -10%)',
          },
        }}
        ariaHideApp={false}
      >
        <WrapperModal>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{modalHelpOrder.question}</p>
          <strong>SUA RESPOSTA</strong>
          <Form schema={schema} onSubmit={handleOnSubmit}>
            <Input type="hidden" name="helpOrderId" value={modalHelpOrder.id} />
            <Input multiline name="answer" />
            <button type="submit">Responder aluno</button>
          </Form>
        </WrapperModal>
      </ReactModal>
    </Container>
  );
}
