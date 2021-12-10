import React, {useEffect, useState} from 'react';

import Wrapper from "../../components/wrapper";
import Container from "../../components/container";
import {H2Text} from "../../components/typography";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import DatebookSettings from "../../components/datebook-settings";
import {ScrollView} from "react-native";

const DatebookScreen = ({route, navigation}) => {
  const { idDatebook } = route.params;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const datebook = useSelector(state => state.datebook.info);

  useEffect(() => {
    dispatch(actions.getDatebook(idDatebook))
  }, []);

  /*const [settingsAddParticipant, setSettingsAddParticipant] = useState({
    user: null,
    notice: null,
    typeNotice: null,
    isSubmitting: null
  });

  const formikAddNewParticipant = useFormik({
    initialValues: { participant: ''},
    validationSchema: validateAddNewParticipant,
    onSubmit: form => {
      setSettingsAddParticipant({isSubmitting: true})
    },
  });

  useEffect(() => {
    dispatch(actions.getDatebook(params.id))
  }, []);

  // Поиск пользователя
  const searchParticipant = useCallback(debounce(800, async (val) => {
    setSettingsAddParticipant({notice: 'Ищем...', typeNotice: 'ordinary'});

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
  }), [datebook]);

  const handlerAddParticipant = e => {
    let value = e.target.value;
    let regxEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    formikAddNewParticipant.setFieldValue('participant', value);

    // Смотри как код сокращается, не забывай оптимизировать
    regxEmail.test(value) ? searchParticipant(value) : setSettingsAddParticipant({})
  };*/

  return (
    <ScrollView>
      <Wrapper>
        {currentUser && datebook && <>
          {/*Блок с выбором настроек*/}
          <DatebookSettings />


          <H2Text type="h1">Задачник "{datebook.title}"</H2Text>
        </>}




{/*}      Настройки
      {settingsTarget && <Component className='mb-5'>

        Добавление нового участника
        {settingsTarget === 'addParticipant' && <>
          <Styled.DatebookFormAddParticipant className="form" onSubmit={formikAddNewParticipant.handleSubmit}>
            <UIClose cls='datebook__close-add-participant'
                     handler={() => {
                       setSettingsTarget('');
                       setSettingsShow(false)
                     }}
            />

            <div className="form__group">
              <h3>Добавить нового участника</h3>

              <FlexBlock wrap="nowrap" align="start">
                <FlexBlock flex="1" direction="column">
                  <input type="email"
                         className={`${(formikAddNewParticipant.errors.participant && formikAddNewParticipant.touched.participant) ? 'error' : ''}`}
                         placeholder="Введи точный email пользователя"
                         {...formikAddNewParticipant.getFieldProps('participant')}
                         onChange={handlerAddParticipant}
                  />

                  {formikAddNewParticipant.errors.participant && formikAddNewParticipant.touched.participant && <FieldNotice>{formikAddNewParticipant.errors.participant}</FieldNotice>}
                </FlexBlock>

                &nbsp;&nbsp;&nbsp;

                <UiBtnSubmit isSubmitting={settingsAddParticipant.isSubmitting}
                             disabled={!(formikAddNewParticipant.isValid && formikAddNewParticipant.dirty && settingsAddParticipant.typeNotice === 'success')}
                             cls='btn btn-tiny'
                >
                  <i className="fa fa-plus-square icon-primary"/>
                </UiBtnSubmit>
              </FlexBlock>
            </div>

            {settingsAddParticipant.notice && <FieldNotice type={settingsAddParticipant.typeNotice}>
              {settingsAddParticipant.notice}
            </FieldNotice>}

          </Styled.DatebookFormAddParticipant>
        </>}
      </Component>}*/}
      </Wrapper>
    </ScrollView>
  );
}

export default DatebookScreen
