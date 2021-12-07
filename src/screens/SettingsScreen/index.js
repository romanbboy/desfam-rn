import React, {useEffect, useState} from 'react';
import {Image, Platform, View} from "react-native";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import Wrapper from "../../components/wrapper";
import Container from "../../components/container";
import {H1Text, H2Text} from "../../components/typography";
import {FormActions, FormGroup, FormLabel, FormWrap} from "../../components/form";
import {Input, MyButton} from "../../components/elements";
import {validateSettings} from "../../utils/validate";
import {FieldNotice} from "../../components/filed-notice";
import actions from "../../store/actions";
import {FlexBlock} from "../../components/flex-block";
import Picshow from "../../components/picshow";

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.auth.currentUser);

  // Для формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState({msg: '', type: 'success'});

  const formik = useFormik({
    initialValues: {username: '', position: '', avatar: '', password: ''},
    validationSchema: validateSettings,
    onSubmit: async (form) => {
      setNotice({msg: '', type: 'success'});
      setIsSubmitting(true);

      const formData = new FormData();
      await Promise.all(
        Object.keys(form).map(async key => {
          if (key === 'avatar') formData.append('avatar', base64Avatar);
          else formData.append(key, form[key]);
        })
      );

      formData.append('mobile', true);

      dispatch(actions.updateCurrentUser(formData))
        .then(() => setNotice({msg: 'Изменения сохранены', type: 'success'}))
        .catch(e => setNotice({msg: e.response.data, type: 'error'}))
        .finally(() => setIsSubmitting(false));
    }
  });

  useEffect(() => {
    if (currentUser) {
      Object.keys(formik.initialValues).forEach(field => {
        if (currentUser.hasOwnProperty(field)) formik.setFieldValue(field, currentUser[field]);
      })
    }
  }, [currentUser]);


  // для Аватарки
  const [base64Avatar, setBase64Avatar] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') alert('Нужен доступ к камере, для смены аватарки');
      }
    })();
  }, []);

  // source для Image в мобилке не работает

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: .8,
      base64: true
    });

    if (!result.cancelled) {
      setBase64Avatar(result.base64);
      setTempAvatar(result.uri)
    }
  };

  const getSettingsAvatar = () => {
    if (tempAvatar) return {uri: tempAvatar};

    if (currentUser?.avatar) {
      let prefix = process.env.NODE_ENV === 'development' ? 'http://10.0.0.135' : '';
      return {uri: `${prefix}${currentUser.avatar}`};
    }
    return require('../../../assets/img/avatar-plug.jpg')
  };

  return (
    <Wrapper>
      <Container>
        <H1Text type="h1">Настройки</H1Text>
        <FormWrap>
          <H2Text>Информация</H2Text>
          <FormGroup style={{marginTop: 10}}>
            <FormLabel>Назови себя</FormLabel>
            <Input value={formik.values.username}
                   onChangeText={formik.handleChange('username')}
                   onBlur={formik.handleBlur('username')}
                   status={(formik.errors.username && formik.touched.username) ? 'error' : 'success'}
                   maxLength={40}
                   textContentType="username"
                   placeholder="Желательно ФИО"
                   placeholderTextColor="#ced1db" />
            {formik.errors.username && formik.touched.username && <FieldNotice>{formik.errors.username}</FieldNotice>}
          </FormGroup>

          <FormGroup>
            <FormLabel>Кто по жизни?</FormLabel>
            <Input value={formik.values.position}
                   onChangeText={formik.handleChange('position')}
                   onBlur={formik.handleBlur('position')}
                   status={(formik.errors.position && formik.touched.position) ? 'error' : 'success'}
                   maxLength={20}
                   placeholder="Например: Менеджер"
                   placeholderTextColor="#ced1db" />
            {formik.errors.position && formik.touched.position && <FieldNotice>{formik.errors.position}</FieldNotice>}
          </FormGroup>

          <FormGroup style={{marginBottom: 20}}>
            <FormLabel>Аватар</FormLabel>
            <FlexBlock alignItems="center">
              <View style={{marginRight: 20}}>
                <Picshow source={getSettingsAvatar()} />
              </View>
              <MyButton onPress={pickImage} >Новый аватар</MyButton>
            </FlexBlock>
          </FormGroup>

          <H2Text>Сменить пароль</H2Text>
          <FormGroup style={{marginBottom: 0, marginTop: 10}}>
            <FormLabel>Новый пароль</FormLabel>
            <Input value={formik.values.password}
                   onBlur={formik.handleBlur('password')}
                   onChangeText={formik.handleChange('password')}
                   status={(formik.errors.password && formik.touched.password) ? 'error' : 'success'}
                   textContentType="password"
                   secureTextEntry={true} />
            {formik.errors.password && formik.touched.password && <FieldNotice>{formik.errors.password}</FieldNotice>}
          </FormGroup>

          {!!notice.msg && <FieldNotice type={notice.type}>{notice.msg}</FieldNotice>}

          <FormActions>
            <MyButton onPress={formik.handleSubmit}
                      isSubmitting={isSubmitting}
                      disabled={!(formik.isValid && formik.dirty && !isSubmitting)}>
              Сохранить
            </MyButton>
          </FormActions>
        </FormWrap>
      </Container>
    </Wrapper>
  );
}

export default SettingsScreen

