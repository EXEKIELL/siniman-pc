function paintLeft(el,data) {
  var leftText = ["待审核","被驳回","待付款","待收货","已完成"];
  var ctx = el.getContext('2d');
  var num = 0;
  var num1 = el.width/11;
  //横线间隔
  for (var i = 0;i<6;i++) {
    ctx.beginPath();
    ctx.moveTo(0,num)
    ctx.lineTo(el.width,num);
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = '#f6f6f6';
    ctx.stroke();
    num+=55;
  }
  //两边竖线
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,el.height-45);
  ctx.stroke()
  ctx.beginPath();
  ctx.moveTo(el.width,0);
  ctx.lineTo(el.width,el.height-45);
  ctx.stroke();
  //柱状
  for (var i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(num1*(2*i+1),0,el.width*65/685,275);
    ctx.fill();
  }
  // 文字
  for (var i = 0; i < leftText.length; i++) {
    ctx.beginPath();
    ctx.font = "14px 微软雅黑";
    ctx.textAlign = "center";
    ctx.fillStyle = "#555555";
    ctx.fillText(leftText[i],num1*(2*i+1)+32,55*5.3);
  }
  // 数据
  for (var i = 0 ;i<data.length;i++) {
    ctx.beginPath();
    ctx.fillStyle = "#ffa897";
    ctx.fillRect(num1*(2*i+1)+1,275,el.width*65/685-2,-data[i])
    ctx.fill();
    ctx.beginPath();
    ctx.font = "14px 微软雅黑";
    ctx.fillStyle = "#ffa897";
    ctx.textAlign = "center";
    ctx.fillText(data[i],num1*(2*i+1)+32,275*(1-data[i]/275)-10)
  }
}

function paintRight(el,data) {
  var rightText = ["新建","已派尺","已测量","已方案","已查房","已下单"];
  var ctx = el.getContext('2d');
  var num = 0;
  var num1 = el.width/13;
  //横线间隔
  for (var i = 0;i<6;i++) {
    ctx.beginPath();
    ctx.moveTo(0,num)
    ctx.lineTo(el.width,num);
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = '#f6f6f6';
    ctx.stroke();
    num+=55;
  }
  //两边竖线
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,el.height-45);
  ctx.stroke()
  ctx.beginPath();
  ctx.moveTo(el.width,0);
  ctx.lineTo(el.width,el.height-45);
  ctx.stroke();
  //柱状
  for (var i = 0; i < rightText.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(num1*(2*i+1),0,el.width*60/685,275);
    ctx.fill();
  }
  // 文字
  for (var i = 0; i < rightText.length; i++) {
    ctx.beginPath();
    ctx.font = "14px 微软雅黑";
    ctx.textAlign = "center";
    ctx.fillStyle = "#555555";
    ctx.fillText(rightText[i],num1*(2*i+1)+30,55*5.3);
  }
  // 数据
  for (var i = 0 ;i<data.length;i++) {
    ctx.beginPath();
    ctx.fillStyle = "#8ac3fa";
    ctx.fillRect(num1*(2*i+1)+1,275,el.width*60/685-2,-data[i])
    ctx.fill();
    ctx.beginPath();
    ctx.font = "14px 微软雅黑";
    ctx.fillStyle = "#8ac3fa";
    ctx.textAlign = "center";
    ctx.fillText(data[i],num1*(2*i+1)+30,275*(1-data[i]/275)-10)
  }
}


export default {
  paintLeft:paintLeft,
  paintRight:paintRight
}
