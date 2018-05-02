function transformDate(val) {
  var date = new Date(val);
  var yy = date.getFullYear();
  var mm = date.getMonth()+1<10?('0'+(date.getMonth()+1)):date.getMonth()+1;
  var dd = date.getDate()<10?('0'+date.getDate()):date.getDate();
  var h = date.getHours()<10?('0'+date.getHours()):date.getHours();
  var minute = date.getMinutes();
  minute = minute<10?('0'+minute):minute;
  var second = date.getSeconds();
  second = second<10?('0'+second):second;
  return yy+'-'+mm+'-'+dd
}

export default {
  transformDate
}
