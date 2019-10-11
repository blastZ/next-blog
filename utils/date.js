export const dateFormat = (date, fmt) => {
  date = new Date(date);
  const o = {
    'M+': date.getMonth() + 1, //月份
    'D+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    S: date.getMilliseconds(), //毫秒
    X: '星期' + '日一二三四五六'.charAt(date.getDay()),
    W: new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')[date.getDay()],
    w: new Array('Sun.', 'Mon.', ' Tues.', 'Wed.', ' Thur.', 'Fri.', 'Sat.')[date.getDay()]
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};
