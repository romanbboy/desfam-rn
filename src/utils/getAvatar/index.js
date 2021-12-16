export default user => {
  if (user?.avatar) {
    let prefix = process.env.NODE_ENV === 'development' ? 'http://10.0.0.135' : '';
    return {uri: `${prefix}${user.avatar}`};
  }
  return require('../../../assets/img/avatar-plug.jpg');
};
