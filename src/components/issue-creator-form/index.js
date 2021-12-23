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
import {Icon, IndexPath, Select, SelectItem} from "@ui-kitten/components";
import {THEME} from "../../styles";
import Calendar from "../calendar";
import {useDispatch, useSelector} from "react-redux";
import ToastService from "../toast/ToastService";

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
        })
        .catch(e => ToastService.show(e.response.data, 'error'))
        .finally(() => setIsSubmitting(false))
    }
  });

  useEffect(() => {
    setDateForm(date.isSameOrAfter(moment(), 'day') ? date : moment());
    setTargetDayDatebook(date);
  }, [date]);

  return (
    <Container>
      <FormLabel style={{fontFamily: 'open-semibold', lineHeight: 35}}>Добавить новый задачу</FormLabel>
      <FlexBlock alignItems='center'>
        <FlexBlock flex='1' styles={{marginRight: 5}}>
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
        <Calendar date={dateForm} setDate={setDateForm} min={moment()} />
      </IssueCreatorFormExecutor>
    </Container>
  )
}

export default IssueCreatorForm
