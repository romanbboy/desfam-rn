import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {H2Text, MyText} from "../../components/typography";
import Wrapper from "../../components/wrapper";
import {FormGroup, FormLabel, FormWrap} from "../../components/form";
import {FlexBlock} from "../../components/flex-block";
import {Input, MyButton, MyButtonTiny} from "../../components/elements";
import {FieldNotice} from "../../components/filed-notice";
import {useFormik} from "formik";
import {validateAddNote} from "../../utils/validate";
import {ScrollView, View} from "react-native";
import Container from "../../components/container";
import {Icon} from "@ui-kitten/components";
import {THEME} from "../../styles";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../store/actions";
import ToastService from "../../components/toast/ToastService";
import Note from "../../components/note";
import {SkeletonList3} from "../../components/skeleton";

const NotesWrap = styled.View`

`;
const NotesActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
`;
const NotesAction = styled.View`
  align-items: center;
  flex-direction: row;
`;
const AddNewNoteClose = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
`;

const NotesList = styled.View`
  margin-top: 15px;
`;

const NotesScreen = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(state => state.notes.notifications)

  const [showForm, setShowForm] = useState(false);
  const [isSubmittingAddNewNote, setIsSubmittingAddNewNote] = useState(false);

  useEffect(() => {
    dispatch(actions.getNotifications());
  }, []);

  const formikAddNewNote = useFormik({
    initialValues: {note: ''},
    validationSchema: validateAddNote,
    onSubmit: form => {
      setIsSubmittingAddNewNote(true);

      dispatch(actions.addNote(form.note.trim()))
        .then(() => {
          formikAddNewNote.resetForm();
          ToastService.show('Заметка добавлена');
          setShowForm(false);
        })
        .catch(e => ToastService.show(e.response.data, 'error'))
        .finally(() => setIsSubmittingAddNewNote(false))
    },
  });

  return (
    <ScrollView>
      <Wrapper>
        <H2Text style={{marginVertical: 10}}>Заметки</H2Text>

        {!showForm && <NotesActions>
          <NotesAction>
            <MyText style={{fontFamily: 'open-semibold', marginRight: 8}}>Добавить заметку</MyText>
            <MyButtonTiny onPress={() => {
              formikAddNewNote.resetForm();
              setShowForm(true)
            }}>
              <Icon name='plus-circle' fill={THEME.BLUE_COLOR} style={{width: 35, height: 35}} />
            </MyButtonTiny>
          </NotesAction>
        </NotesActions>}

        {showForm && <Container>
          <AddNewNoteClose>
            <MyButtonTiny onPress={() => setShowForm(false)}>
              <Icon name='close-outline' style={{width: 30, height: 30}} />
            </MyButtonTiny>
          </AddNewNoteClose>

          <FormWrap style={{marginVertical: 0}}>
            <FormGroup style={{marginBottom: 0}}>
              <FormLabel weight='bold'>Добавить заметку</FormLabel>
              <View>
                <Input value={formikAddNewNote.values.note}
                       onBlur={formikAddNewNote.handleBlur('note')}
                       status={(formikAddNewNote.errors.note && formikAddNewNote.touched.note) ? 'error' : 'success'}
                       maxLength={200}
                       placeholder='Заметка'
                       placeholderTextColor="#ced1db"
                       multiline={true}
                       numberOfLines = {3}
                       style={{textAlignVertical: 'top'}}
                       onChangeText={formikAddNewNote.handleChange('note')} />
                {formikAddNewNote.errors.note && formikAddNewNote.touched.note && <FieldNotice>{formikAddNewNote.errors.note}</FieldNotice>}

                <FlexBlock justifyContent='flex-end' styles={{marginTop: 10}}>
                  <MyButton onPress={formikAddNewNote.handleSubmit}
                            isSubmitting={isSubmittingAddNewNote}
                            disabled={!(formikAddNewNote.isValid && formikAddNewNote.dirty && !isSubmittingAddNewNote)}>
                    Добавить заметку
                  </MyButton>
                </FlexBlock>
              </View>
            </FormGroup>
          </FormWrap>
        </Container>}


        {!notifications && <SkeletonList3 />}
        {notifications && <>
          {!notifications.length && <Container style={{alignItems: 'center'}}>
            <MyText>Добавь свою первую заметку</MyText>
          </Container>}

          {!!notifications.length && <NotesList>
            {notifications.map(note => <Note note={note} key={note.id} />)}
          </NotesList>}
        </>}
      </Wrapper>
    </ScrollView>
  )
}

export default NotesScreen