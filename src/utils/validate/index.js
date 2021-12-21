import * as Yup from 'yup';

const validObj = {
  username: Yup.string().required('Обязательное поле').min(3, 'Не менее 3 символов').max(40, 'Не более 40 символов'),
  email: Yup.string().required('Обязательное поле').email('Неверный формат E-mail'),
  password: Yup.string().required('Обязательное поле').min(5, 'Не менее 5 символов'),
  passwordNotRequired: Yup.string().min(5, 'Не менее 5 символов'),
  datebook: Yup.string().required('Обязательное поле').min(3, 'Не менее 3 символов').max(50, 'Не более 50 символов'),
  position: Yup.string().max(20, 'Не более 20 символов'),
  description: Yup.string().required('Обязательное поле').min(3, 'Не менее 3 символов').max(200, 'Не более 200 символов'),
}

export const validateRegistration = ({username, email, password} = validObj) => Yup.object({username, email, password});
export const validateLogin = ({email, password} = validObj) => Yup.object({email, password});
export const validateAddNewDatebook = ({datebook} = validObj) => Yup.object({datebook});
export const validateAddNewParticipant = ({email} = validObj) => Yup.object({participant: email});
export const validateSettings = ({username, position, passwordNotRequired} = validObj) => Yup.object({username, position, password: passwordNotRequired});
export const validateAddIssue = ({description} = validObj) => Yup.object({description});
