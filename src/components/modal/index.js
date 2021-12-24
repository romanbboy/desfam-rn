import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Button, Icon} from "@ui-kitten/components";
import {MyText} from "../typography";
import Spinner from "../spinner";

const ModalConfirmWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalConfirmContent = styled.View`
  background: #fff;
  padding: 40px 20px 20px;
  align-items: center;
  width: 80%;
`;

const ModalConfirmText = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ModalConfirmOptions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 28px;
  align-self: flex-end;
`;

const ModalConfirm = ({msg, accept, reject}) => {
  const [loading, setLoading] = useState(false);

  const handlerAccept = async () => {
    setLoading(true);
    await accept();
  }

  return (
    <ModalConfirmWrap>
      <ModalConfirmContent>
        <ModalConfirmText>
          <Icon name='alert-triangle-outline' style={{width: 30, height: 30, marginRight: 14}} />
          <MyText>{msg}</MyText>
        </ModalConfirmText>

        <ModalConfirmOptions>
          <Button onPress={reject} style={{marginRight: 7}}
                  accessoryLeft={() => <Icon name='close-outline' fill='#fff' style={{width: 20, height: 20}} />}
                  status='danger'
                  size='small' >
            <MyText>Нет</MyText>
          </Button>

          <Button onPress={handlerAccept}
                  accessoryLeft={() => <Icon name='checkmark-outline' fill='#fff' style={{width: 20, height: 20}} />}
                  size='small' >
            {!loading && 'Да'}
            {loading && <Spinner />}
          </Button>
        </ModalConfirmOptions>
      </ModalConfirmContent>
    </ModalConfirmWrap>
  )
}

export default ModalConfirm
