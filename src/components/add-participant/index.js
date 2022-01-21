import React, {useCallback, useState} from 'react'
import Container from "../container";
import {Input, MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import {FormGroup, FormLabel, FormWrap} from "../form";
import {FlexBlock} from "../flex-block";
import {THEME} from "../../styles";
import {FieldNotice} from "../filed-notice";
import styled from "styled-components/native";
import {useFormik} from "formik";
import {validateAddNewParticipant} from "../../utils/validate";
import debounce from '../../utils/debounce'
import UserService from "../../services/UserService";
import * as yup from "yup";
import {useSelector} from "react-redux";
import InvitationService from "../../services/InvitationService";
import ToastService from "../toast/ToastService";
import {sendPushNotification} from "../../utils/notifications";


const AddParticipantClose = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
`

const AddParticipant = ({onClose}) => {
  const datebook = useSelector(state => state.datebook.info);

  const [settingsAddParticipant, setSettingsAddParticipant] = useState({});

  const formikAddParticipant = useFormik({
    initialValues: { participant: ''},
    validationSchema: validateAddNewParticipant,
    onSubmit: async () => {
      setSettingsAddParticipant({...settingsAddParticipant, isSubmitting: true});
      const invite = {datebook, referral: settingsAddParticipant.user};

      await InvitationService.add(invite)
        .then(res => {
          formikAddParticipant.resetForm();
          ToastService.show(res.data);

          if (settingsAddParticipant.user.expoToken) {
            sendPushNotification({
              to: settingsAddParticipant.user.expoToken,
              sound: 'default',
              title: 'Приглашение в задачник',
              body: `Тебя пригласили в задачник "${datebook.title}"`
            });
          }

          return {};
        })
        .catch(e => ToastService.show(e.response.data, 'error'))
        .then((res) => {
          setSettingsAddParticipant({...(res ?? settingsAddParticipant), isSubmitting: false})
        });
    },
  });

  // Поиск пользователя
  const searchParticipant = useCallback(debounce(800)(async (val) => {
    setSettingsAddParticipant({notice: 'Ищем...', typeNotice: 'standard'});

    let user = await UserService.findOne('email', val);
    user = user.data;

    let participant = user;
    let notice = user ? `${user.username} найден` : 'Пользователь не найден';
    let typeNotice = user ? 'success' : 'error';

    if (user && datebook.participants.find(el => el.id === user.id)){
      participant = null;
      notice = `${user.username} уже участник этого задачника`;
      typeNotice = 'error';
    }

    setSettingsAddParticipant({user: participant, notice, typeNotice});
  }), []);

  const handlerAddParticipant = async (value) => {
    let regxEmail = yup.string().required().email();
    let validEmail = await regxEmail.isValid(value);

    await formikAddParticipant.setFieldValue('participant', value);

    validEmail ? searchParticipant(value) : setSettingsAddParticipant({})
  };

  return (
    <Container>
      <AddParticipantClose>
        <MyButtonTiny onPress={onClose}>
          <Icon name='close-outline' style={{width: 30, height: 30}} />
        </MyButtonTiny>
      </AddParticipantClose>

      <FormWrap>
        <FormGroup>
          <FormLabel weight='bold'>Добавить нового участника</FormLabel>
          <FlexBlock alignItems='center'>
            <FlexBlock styles={{marginRight: 10}}>
              <Input value={formikAddParticipant.values.participant}
                     onBlur={formikAddParticipant.handleBlur('participant')}
                     status={(formikAddParticipant.errors.participant && formikAddParticipant.touched.participant) ? 'error' : 'success'}
                     keyboardType="email-address"
                     textContentType="emailAddress"
                     placeholder='Введите точный email пользователя'
                     placeholderTextColor="#ced1db"
                     onChangeText={handlerAddParticipant} />
            </FlexBlock>

            <MyButtonTiny onPress={formikAddParticipant.handleSubmit}
                          isSubmitting={settingsAddParticipant.isSubmitting}
                          disabled={!(formikAddParticipant.isValid && formikAddParticipant.dirty && !settingsAddParticipant.isSubmitting && settingsAddParticipant.user)}>
              <Icon name='plus-square'
                    fill={!(formikAddParticipant.isValid && formikAddParticipant.dirty && !settingsAddParticipant.isSubmitting && settingsAddParticipant.user) ? THEME.GRAY_COLOR : THEME.BLUE_COLOR}
                    style={{width: 35, height: 35}} />
            </MyButtonTiny>
          </FlexBlock>
          {formikAddParticipant.errors.participant && formikAddParticipant.touched.participant && <FieldNotice>{formikAddParticipant.errors.participant}</FieldNotice>}
          {!!settingsAddParticipant.notice && <FieldNotice type={settingsAddParticipant.typeNotice}>{settingsAddParticipant.notice}</FieldNotice>}
        </FormGroup>
      </FormWrap>
    </Container>
  )
}

export default AddParticipant
