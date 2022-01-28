import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import moment from "moment";
import Container from "../container";
import {MyText} from "../typography";
import {FormLabel} from "../form";
import {Input, MyButtonTiny} from "../elements";
import {FieldNotice} from "../filed-notice";
import {useFormik} from "formik";
import {validateAddIssue} from "../../utils/validate";
import actions from "../../store/actions";
import {FlexBlock} from "../flex-block";
import {Button, Icon, IndexPath, Select, SelectItem} from "@ui-kitten/components";
import {THEME} from "../../styles";
import Calendar from "../calendar";
import {useDispatch, useSelector} from "react-redux";
import ToastService from "../toast/ToastService";
import {Platform, View} from "react-native";
import {sendPushNotification} from "../../utils/notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import {animated, useSpring} from "@react-spring/native";
import * as Notifications from "expo-notifications";

const PersonalIssueCreatorFormSettings = styled.View`
  margin-top: 10px;
`;

const PersonalIssueCreatorFormNotification = styled.View`
  margin-top: 10px;
  flex-direction: row;
`;

const PersonalIssueCreatorFormClose= styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
`

const PersonalIssueCreatorForm = ({onClose}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);
  const personalDatebook = useSelector(state => state.main.personalDatebook);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dateForm, setDateForm] = useState(moment());

  const [showNotificationTimeBlock, setShowNotificationTimeBlock] = useState(false);

  const [showAndroidDatePicker, setShowAndroidDatePicker] = useState(false);
  const [showAndroidTimePicker, setShowAndroidTimePicker] = useState(false);

  const formik = useFormik({
    initialValues: {description: ''},
    validationSchema: validateAddIssue,
    onSubmit: async (form) => {
      setIsSubmitting(true);

      let identifierNotification = '';
      if (showNotificationTimeBlock) identifierNotification = `notice-issue--${+ Date.now()}-${currentUser.id}`;

      const issueRequest = {
        date: dateForm,
        datebook: personalDatebook.idDatebook,
        notification: identifierNotification,
        content: form.description,
        creator: currentUser.id
      };
      
      dispatch(actions.addIssue(issueRequest))
        .then(res => {
          const issue = res.data;
          
          dispatch(actions.addPersonalIssueSuccess({issue}));
          formik.resetForm();

          if (Platform.OS !== 'web' && currentUser.expoToken) {
            // Покажется уведомление по расписанию для текущего пользователя
            if (showNotificationTimeBlock) {
              Notifications.scheduleNotificationAsync({
                identifier: identifierNotification,
                content: { title: issue.content },
                trigger: new Date(moment(dateForm).toString())
              });
            }
          }

          onClose();
        })
        .catch(e => ToastService.show(e.response.data, 'error'))
        .finally(() => setIsSubmitting(false))
    }
  });


  const AnimatedView = animated(View);
  const propsUI = useSpring({
    from: {opacity: 0},
    to: {opacity: 1}
  })

  return (
    <AnimatedView style={{overflow: 'hidden', ...propsUI}}>
      <Container>
        <PersonalIssueCreatorFormClose>
          <MyButtonTiny onPress={onClose}>
            <Icon name='close-outline' style={{width: 30, height: 30}} />
          </MyButtonTiny>
        </PersonalIssueCreatorFormClose>

        <FormLabel style={{fontFamily: 'open-semibold', lineHeight: 35}}>Добавить новую задачу</FormLabel>
        <FlexBlock alignItems='center'>
          <FlexBlock styles={{marginRight: 5}}>
            <Input value={formik.values.description}
                   onChangeText={formik.handleChange('description')}
                   onBlur={formik.handleBlur('description')}
                   status={(formik.errors.description && formik.touched.description) ? 'error' : 'success'}
                   maxLength={200}
                   placeholder="Опиши задачу"
                   placeholderTextColor="#ced1db" />
          </FlexBlock>

          <MyButtonTiny onPress={formik.handleSubmit}
                        isSubmitting={isSubmitting}
                        disabled={!(formik.isValid && formik.dirty && !isSubmitting)}>
            <Icon name='plus'
                  fill={!(formik.isValid && formik.dirty && !isSubmitting) ? THEME.GRAY_COLOR : THEME.GREEN_COLOR_DARK}
                  style={{width: 27, height: 27}} />
          </MyButtonTiny>
        </FlexBlock>
        {formik.errors.description && formik.touched.description && <FieldNotice>{formik.errors.description}</FieldNotice>}

        <PersonalIssueCreatorFormSettings>
          <MyText style={{marginBottom: 5}}>Назначить на дату:</MyText>
          {Platform.OS === 'web' && <Calendar date={dateForm} setDate={setDateForm} min={moment()} />}
          {Platform.OS === 'ios' && (
            <DateTimePicker value={dateForm.toDate()}
                            minimumDate={moment().toDate()}
                            locale='ru'
                            onChange={(e, date) => setDateForm(moment(date))}
                            style={{width: 100}}/>)
          }
          {Platform.OS === 'android' && <>
            <Button appearance='outline'
                    status='basic'
                    size='tiny'
                    onPress={() => setShowAndroidDatePicker(true)}
            >
              {() => <MyText>{dateForm.format('DD.MM.YYYY')}</MyText>}
            </Button>

            {showAndroidDatePicker && (
              <DateTimePicker value={dateForm.toDate()}
                              minimumDate={moment().toDate()}
                              onChange={(e, date) => {
                                setShowAndroidDatePicker(false);
                                date && setDateForm(moment(date));
                              }}/>
            )}
          </>}


          {/*Блок уведомление*/}
          {Platform.OS !== 'web' && <PersonalIssueCreatorFormNotification>
            <Button appearance='ghost'
                  size='tiny'
                  style={{marginRight: 10}}
                  onPress={() => setShowNotificationTimeBlock(!showNotificationTimeBlock)}
                  accessoryLeft={() =>
                    <Icon name='bell-outline'
                          fill={showNotificationTimeBlock ? THEME.BLUE_COLOR : THEME.GRAY_COLOR_DARK}
                          style={{width: 27, height: 27}}
                    />
                  }
            />


            {showNotificationTimeBlock && <>

              {Platform.OS === 'ios' && (
                <DateTimePicker value={dateForm.toDate()}
                                mode="time"
                                locale='ru'
                                onChange={(e, date) => setDateForm(moment(date))}
                                style={{width: 68}}/>)
              }

              {Platform.OS === 'android' && <>
                <Button appearance='outline'
                        status='basic'
                        size='tiny'
                        onPress={() => setShowAndroidTimePicker(true)}
                >
                  {() => <MyText>{dateForm.format('HH:mm')}</MyText>}
                </Button>

                {showAndroidTimePicker && (
                  <DateTimePicker value={dateForm.toDate()}
                                  mode="time"
                                  locale='ru'
                                  onChange={(e, date) => {
                                    setShowAndroidTimePicker(false);
                                    date && setDateForm(moment(date))
                                  }}
                  />
                )}
              </>}
            </>}
          </PersonalIssueCreatorFormNotification>}
        </PersonalIssueCreatorFormSettings>
      </Container>
    </AnimatedView>
  )
}

export default PersonalIssueCreatorForm
