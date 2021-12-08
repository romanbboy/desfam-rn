import {Input, MyButtonTiny} from "../elements";
import {Icon} from "@ui-kitten/components";
import {FormGroup, FormLabel, FormWrap} from "../form";
import {FlexBlock} from "../flex-block";
import {THEME} from "../../styles";
import {FieldNotice} from "../filed-notice";
import Container from "../container";
import React, {useState} from "react";
import {useFormik} from "formik";
import {validateAddNewDatebook} from "../../utils/validate";
import actions from "../../store/actions";
import {useDispatch} from "react-redux";
import styled from "styled-components/native/dist/styled-components.native.esm";


export const AddNewDatebookClose = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
`

export const AddNewDatebook = ({onClose}) => {
  const dispatch = useDispatch();

  const [isSubmittingAddNewDatebook, setIsSubmittingAddNewDatebook] = useState(false);
  const [noticeAddNewDatebook, setNoticeAddNewDatebook] = useState({msg: '', type: 'success'});

  const formikAddNewDatebook = useFormik({
    initialValues: {
      datebook: ''
    },
    validationSchema: validateAddNewDatebook,
    onSubmit: form => {
      setNoticeAddNewDatebook({msg: '', type: 'success'});
      setIsSubmittingAddNewDatebook(true);

      dispatch(actions.addDatebook(form))
        .then(() => {
          formikAddNewDatebook.resetForm();
          onClose();
        })
        .catch(e => setNoticeAddNewDatebook({msg: e.response.data, type: 'error'}))
        .finally(() => setIsSubmittingAddNewDatebook(false))
    },
  });

  return (
    <Container>
      <AddNewDatebookClose>
        <MyButtonTiny onPress={onClose}>
          <Icon name='close-outline' style={{width: 30, height: 30}} />
        </MyButtonTiny>
      </AddNewDatebookClose>

      <FormWrap>
        <FormGroup>
          <FormLabel weight='bold'>Добавить новый задачник</FormLabel>
          <FlexBlock alignItems='center'>
            <FlexBlock flex='1' styles={{marginRight: 10}}>
              <Input value={formikAddNewDatebook.values.datebook}
                     onBlur={formikAddNewDatebook.handleBlur('datebook')}
                     status={(formikAddNewDatebook.errors.datebook && formikAddNewDatebook.touched.datebook) ? 'error' : 'success'}
                     maxLength={50}
                     placeholder='Название задачника, сообщества'
                     placeholderTextColor="#ced1db"
                     onChangeText={formikAddNewDatebook.handleChange('datebook')} />
            </FlexBlock>

            <MyButtonTiny onPress={formikAddNewDatebook.handleSubmit}
                          isSubmitting={isSubmittingAddNewDatebook}
                          disabled={!(formikAddNewDatebook.isValid && formikAddNewDatebook.dirty && !isSubmittingAddNewDatebook)}>
              <Icon name='plus-square'
                    fill={!(formikAddNewDatebook.isValid && formikAddNewDatebook.dirty && !isSubmittingAddNewDatebook) ? THEME.GRAY_COLOR : THEME.BLUE_COLOR}
                    style={{width: 35, height: 35}} />
            </MyButtonTiny>
          </FlexBlock>
          {formikAddNewDatebook.errors.datebook && formikAddNewDatebook.touched.datebook && <FieldNotice>{formikAddNewDatebook.errors.datebook}</FieldNotice>}
          {!!noticeAddNewDatebook.msg && <FieldNotice type={noticeAddNewDatebook.type}>{noticeAddNewDatebook.msg}</FieldNotice>}
        </FormGroup>
      </FormWrap>
    </Container>
  )
}
