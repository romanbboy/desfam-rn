import React, {useState} from 'react'
import * as Styled from "./styles";
import {MyText} from "../typography";
import {MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import AddParticipant from "../add-participant";

const DatebookSettings = (props) => {
  const [settingsShow, setSettingsShow] = useState(false);
  const [settingsTarget, setSettingsTarget] = useState('');

  const allClose = () => {
    setSettingsShow(false);
    setSettingsTarget('')
  }

  return (
    <Styled.DatebookSettingsWrap>

      {/*Блок с выбором настроек*/}
      {!settingsTarget && <Styled.DatebookSettingsActions>

        {!settingsShow && <Styled.DatebookSettingsAction>
          <MyText style={{fontFamily: 'open-semibold', marginRight: 8, lineHeight: 0}}>Настройки</MyText>
          <MyButtonTiny onPress={() => setSettingsShow(true)}>
            <Icon name='options-2' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
          </MyButtonTiny>
        </Styled.DatebookSettingsAction>}

        {settingsShow && <>
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
      </Styled.DatebookSettingsActions>}

      {/*Настройки*/}
      {!!settingsTarget && <>

        {/*Добавление нового участника*/}
        {settingsTarget === 'addParticipant' && <AddParticipant onClose={allClose} />}


      </>}
    </Styled.DatebookSettingsWrap>
  )
}

export default DatebookSettings
