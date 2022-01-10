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

const IssueCreatorFormExecutor = styled.View`
  margin-top: 10px;
`

const IssueCreatorForm = ({date, datebook}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(
    datebook.participants.findIndex(el => el.id === currentUser.id)
  ));

  const [dateForm, setDateForm] = useState(date);
  const [targetDayDatebook, setTargetDayDatebook] = useState(date);

  const [showAndroidDatePicker, setShowAndroidDatePicker] = useState(false);

  const formik = useFormik({
    initialValues: {description: ''},
    validationSchema: validateAddIssue,
    onSubmit: async (form) => {
      setIsSubmitting(true);

      const issueRequest = {
        date: dateForm,
        datebook: datebook.id,
        target: datebook.participants[selectedIndex.row].id,
        content: form.description
      };

      dispatch(actions.addIssue(issueRequest))
        .then(res => {
          const issue = res.data;
          const matchDate = moment(issue.date).isSame(targetDayDatebook, 'day');
          const postfixMsg = !matchDate ? `на ${moment(issue.date).format('DD.MM.YYYY')}` : '';

          ToastService.show(`Задача добавлена ${postfixMsg}`);

          matchDate && dispatch(actions.addIssueSuccess({issue}));
          formik.resetForm();

          // todo push
          /*if (Platform.OS !== 'web' && issue.target.expoToken) {
            sendPushNotification({
              to: issue.target.expoToken,
              sound: 'default',
              title: 'Новая задача!',
              body: `${issue.creator.username} назначил на тебя задачу`
            });
          }*/
        })
        .catch(e => ToastService.show(e.response.data, 'error'))
        .finally(() => setIsSubmitting(false))
    }
  });

  useEffect(() => {
    setDateForm(date.isSameOrAfter(moment(), 'day') ? date : moment());
    setTargetDayDatebook(date);
  }, [date]);


  const AnimatedView = animated(View);
  const propsUI = useSpring({
    from: {opacity: 0},
    to: {opacity: 1}
  })

  return (
    <AnimatedView style={{overflow: 'hidden', ...propsUI}}>
      <Container>
        <FormLabel style={{fontFamily: 'open-semibold', lineHeight: 35}}>Добавить новый задачу</FormLabel>
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

        <IssueCreatorFormExecutor>
          <MyText style={{marginBottom: 5}}>Назначить на участника:</MyText>
          <Select selectedIndex={selectedIndex}
                  size='small'
                  value={() => <MyText>{datebook.participants[selectedIndex.row].username}</MyText>}
                  style={{marginBottom: 10}}
                  onSelect={index => setSelectedIndex(index)}>
            {datebook.participants.map(el => <SelectItem style={{paddingVertical: 5}} key={el.id} title={() => <MyText>{el.username}</MyText>}/>)}
          </Select>

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
        </IssueCreatorFormExecutor>
      </Container>
    </AnimatedView>
  )
}

export default IssueCreatorForm
