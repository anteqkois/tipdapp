const uid = () =>
  String(Date.now() * Math.random().toString(32) + Math.random().toString(32) + Math.random().toString(32)).replace(/\./g, '');

export default uid;
