import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useDispatch} from "react-redux";

import Wrapper from "../../components/wrapper";
import Container from "../../components/container";
import {H1Text} from "../../components/typography";
import {FormActions, FormGroup, FormLabel, FormWrap} from "../../components/form";
import {Input, MyButton} from "../../components/elements";
import {validateLogin} from "../../utils/validate";
import {FieldNotice} from "../../components/filed-notice";
import actions from "../../store/actions";
import {ScrollView} from "react-native";

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState({msg: '', type: 'success'});

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: validateLogin,
    onSubmit: async (form) => {
      setNotice({msg: '', type: 'success'});
      setIsSubmitting(true);

      dispatch(actions.login(form))
        .then(() => navigation.navigate('Home'))
        .catch(e => setNotice({msg: e.response.data, type: 'error'}))
        .finally(() => setIsSubmitting(false))
    }
  })

  return (
    <ScrollView>
      <Wrapper>
        <Container>
          <H1Text type="h1">Авторизация</H1Text>
          <FormWrap>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <Input value={formik.values.email}
                     onBlur={formik.handleBlur('email')}
                     status={(formik.errors.email && formik.touched.email) ? 'error' : 'success'}
                     keyboardType="email-address"
                     textContentType="emailAddress"
                     onChangeText={formik.handleChange('email')} />
              {formik.errors.email && formik.touched.email && <FieldNotice>{formik.errors.email}</FieldNotice>}
            </FormGroup>

            <FormGroup style={{marginBottom: 0}}>
              <FormLabel>Пароль</FormLabel>
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
                Вход
              </MyButton>
            </FormActions>
          </FormWrap>
        </Container>
      </Wrapper>
    </ScrollView>
  );
}

export default LoginScreen
