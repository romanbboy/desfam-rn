export default user => {
  if (user?.avatar) {
    let prefix = process.env.NODE_ENV === 'development' ? 'https://desfam.ru' : 'https://desfam.ru';
    return {uri: `${prefix}${user.avatar}`};
  }
  return require('../../../assets/img/avatar-plug.jpg');
};
