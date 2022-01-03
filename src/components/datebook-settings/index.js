import React, {useState} from 'react'
import * as Styled from "./styles";
import {MyText} from "../typography";
import {MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import AddParticipant from "../add-participant";
import ModalService from "../modal/ModalService";
import {useDispatch} from "react-redux";
import actions from "../../store/actions";
import ToastService from "../toast/ToastService";
import {useNavigation} from "@react-navigation/native";
import RemoveParticipant from "../remove-participant";

const DatebookSettings = ({currentUser, datebook}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [settingsShow, setSettingsShow] = useState(false);
  const [settingsTarget, setSettingsTarget] = useState('');

  const allClose = () => {
    setSettingsShow(false);
    setSettingsTarget('')
  }

  const confirmEscape = () => {
    ModalService.confirm({
      msg: `Точно покинуть задачник?`,
      accept: async () => {
        return dispatch(actions.escapeDatebook(datebook))
          .then(() => {
            navigation.navigate('Home');
            ToastService.show('Ты покинул заданик')
            return true;
          })
          .catch(e => ToastService.show(e.response.data, 'error'))
      }
    })
  }

  return (
    <Styled.DatebookSettingsWrap>

      {/*Блок с выбором настроек*/}
      {!settingsTarget && <Styled.DatebookSettingsActions>

        {!settingsShow && <Styled.DatebookSettingsAction>
          <MyText style={{fontFamily: 'open-semibold', marginRight: 8}}>Настройки</MyText>
          <MyButtonTiny onPress={() => setSettingsShow(true)}>
            <Icon name='options-2' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
          </MyButtonTiny>
        </Styled.DatebookSettingsAction>}

        {settingsShow && <>
          {currentUser.id === datebook.creator && <>
            <MyButtonTiny onPress={() => setSettingsTarget('addParticipant')}>
              <Icon name='person-add' fill={THEME.GREEN_SUCCESS} style={{width: 30, height: 30}} />
            </MyButtonTiny>

            <MyButtonTiny onPress={() => setSettingsTarget('removeParticipant')} style={{marginHorizontal: 25}}>
              <Icon name='person-remove' fill={THEME.RED_COLOR} style={{width: 30, height: 30}} />
            </MyButtonTiny>

            <MyButtonTiny onPress={() => setSettingsShow(false)}>
              <Icon name='close-circle-outline' fill={THEME.GRAY_COLOR_DARK} style={{width: 30, height: 30}} />
            </MyButtonTiny>
          </>}

          {currentUser.id !== datebook.creator && <>
            <MyButtonTiny onPress={confirmEscape} style={{marginRight: 25}}>
              <Icon name='close-square-outline' fill={THEME.RED_COLOR} style={{width: 30, height: 30}} />
            </MyButtonTiny>

            <MyButtonTiny onPress={() => setSettingsShow(false)}>
              <Icon name='close-circle-outline' fill={THEME.GRAY_COLOR_DARK} style={{width: 30, height: 30}} />
            </MyButtonTiny>
          </>}
        </>}
      </Styled.DatebookSettingsActions>}

      {/*Настройки*/}
      {!!settingsTarget && <>

        {/*Добавление нового участника*/}
        {settingsTarget === 'addParticipant' && <AddParticipant onClose={allClose} />}

        {/*Удаление участников*/}
        {settingsTarget === 'removeParticipant' && <RemoveParticipant onClose={allClose} />}

      </>}
    </Styled.DatebookSettingsWrap>
  )
}

export default DatebookSettings
