import React from 'react';
import { Formik } from 'formik';

import Wrapper from "../../components/wrapper";
import Container from "../../components/container";
import {H1Text} from "../../components/typography";
import {FormActions, FormGroup, FormLabel, FormWrap} from "../../components/form";
import {Input, MyButton} from "../../components/elements";

const LoginScreen = () => {
  return (
    <Wrapper>
      <Container>
        <H1Text type="h1">Авторизация</H1Text>

        <Formik
          initialValues={{ email: '' }}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <FormWrap>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormGroup>
              <FormGroup style={{marginBottom: 0}}>
                <FormLabel>Пароль</FormLabel>
                <Input secureTextEntry={true} />
              </FormGroup>

              <FormActions>
                <MyButton onPress={() => console.log('-----> ', 'xxx')} disabled>Вход</MyButton>
              </FormActions>
            </FormWrap>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}

export default LoginScreen
