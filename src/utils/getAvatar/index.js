export default user => {
  if (user?.avatar) {
    let prefix = process.env.NODE_ENV === 'development'
      ? `${process.env.URL_DEVELOPMENT}:80`
      : process.env.URL_PRODUCTION;

    return {uri: `${prefix}${user.avatar}`};
  }
  return require('../../../assets/img/avatar-plug.jpg');
};
