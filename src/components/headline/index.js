import React, {useState} from 'react'
import styled from 'styled-components/native'

import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import {MyText} from "../typography";
// import {LinearGradient} from "expo-linear-gradient";
import Calendar from "../calendar";
import {Button, Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import {Platform, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const HeadlineWrap = styled.View`
  margin: 20px 0;
`;

const HeadlineDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const HeadlineDay = styled.View`
  
`;

const HeadlineFullDate = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Headline = ({date, setDate, issueCreator}) => {
  const [showAndroidDatePicker, setShowAndroidDatePicker] = useState(false);

  return (
    <HeadlineWrap>
      <HeadlineDate>
        <HeadlineDay>
          <MyText style={{fontSize: 18, fontFamily: 'open-light'}}>{capitalizeFirstLetter(date.format('dddd'))}</MyText>
        </HeadlineDay>
        <HeadlineFullDate>
          <Button appearance='ghost'
                  size='tiny'
                  style={{marginRight: 10}}
                  onPress={() => issueCreator.setShowIssueCreator(!issueCreator.showIssueCreator)}
                  accessoryLeft={() => <Icon name='edit-2-outline' fill={issueCreator.showIssueCreator ? THEME.BLUE_COLOR : "rgb(130, 142, 165)"} style={{width: 23, height: 23}} />} />

          {Platform.OS === 'web' && <Calendar date={date} setDate={setDate} placement='top start' />}

          {Platform.OS === 'ios' && (
            <DateTimePicker value={date.toDate()}
                            locale='ru'
                            onChange={(e, date) => setDate(moment(date))}
                            style={{width: 100}}/>)
          }

          {Platform.OS === 'android' && <>
            <Button appearance='outline'
                    status='basic'
                    size='tiny'
                    onPress={() => setShowAndroidDatePicker(true)}
            >
              {() => <MyText>{date.format('DD.MM.YYYY')}</MyText>}
            </Button>

            {showAndroidDatePicker && (
              <DateTimePicker value={date.toDate()}
                              onChange={(e, date) => {
                                setShowAndroidDatePicker(false);
                                date && setDate(moment(date));
                              }}/>
            )}
          </>}
        </HeadlineFullDate>
      </HeadlineDate>

      {/*<LinearGradient
        start={{x: 0, y: 1}} end={{x: 1, y: 1}}
        locations={[0, 0.15, 0.85, 1]}
        colors={['rgba(255,255,255, 0)', '#cad6f4', '#cad6f4', 'rgba(255,255,255, 0)']}
        style={{height: 1}}
      />*/}
    </HeadlineWrap>
  )
}

export default Headline
