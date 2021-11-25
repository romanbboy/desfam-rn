export default ms => f => {
  let timerId;
  return function() {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => f.apply(this, arguments), ms);
  };
};