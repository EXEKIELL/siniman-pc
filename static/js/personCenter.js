export default {
  name: 'PersonCenter',
  data(){
    return {
      screenWidth: $('.w2-left').width(),//获取窗口大小
      show1:true,
      show2:true,
      value1: '',
      headLeft: {
        src:"./static/img/hlicon.png",
        text:"个人中心"
      },
      swiperList:[
        {src:"./static/img/img01.png"},
        {src:"./static/img/img01.png"},
        {src:"./static/img/img01.png"}
      ],
      PersonCenterLists:[
        {}
      ],
      leixing:[
        {text:"全部"},
        {text:"全屋方案"},
        {text:"空间方案"}
      ],
      jieduan:[
        {text:"全部"},
        {text:"户型阶段"},
        {text:"装修阶段"}
      ],
      huxing:[
        {text:"全部"},
        {text:"一室一厅"},
        {text:"两室一厅"},
        {text:"两室二厅"},
        {text:"三室一厅"},
        {text:"三室二厅"},
        {text:"四室一厅"},
        {text:"四室两厅"},
        {text:"其他"}
      ],
      fengge:[
        {text:"全部"},
        {text:"北欧"},
        {text:"简欧"},
        {text:"现代简约"},
        {text:"新中式"},
        {text:"其他"}
      ],
      aaa:"aaa"
    }
  },
  methods:{
    navSel(){
      var e = event.target;
      $(e).addClass("sel");
      $(e).parent('div').siblings('div').find('div').removeClass('sel')
    },
    dianwo(){
      var e = event.target;
      $(e).parent('div').find('.el-input__inner').focus()
    },
    toUrl(){
      this.$router.push('/myProject')
    }
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val
      console.log(this.screenWidth)
    }
  },
  mounted(){
    var swiper1 = new Swiper('#swiper1',{
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop:true,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next'
    })
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenWidth = $('.w2-left').width();
        canv.width = ($('.w2-left').width()*0.80);
        canv1.width = ($('.w2-left').width()*0.80)
        paintLeft(canv,leftData);
        paintRight(canv1,rightData);
      })()
    }
    var canv = $('#canvas1')[0];
    var canv1 = $('#canvas2')[0];
    that.screenWidth = $('.w2-left').width();
    canv.width = ($('.w2-left').width()*0.80)
    canv1.width = ($('.w2-left').width()*0.80)
    var leftData = [65,82,36,236,125];
    var rightData = [26,40,20,63,45,45];
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
        ctx.fillText(leftText[i],num1*(2*i+1)+27,55*5.3);
      }
      // 数据
      for (var i = 0 ;i<data.length;i++) {
        ctx.beginPath();
        ctx.fillStyle = "#ffa897";
        ctx.fillRect(num1*(2*i+1),275,el.width*65/685,-data[i])
        ctx.fill();
        ctx.beginPath();
        ctx.font = "14px 微软雅黑";
        ctx.fillStyle = "#ffa897";
        ctx.textAlign = "center";
        ctx.fillText(data[i],num1*(2*i+1)+32,275*(1-data[i]/275)-10)
      }
    }
    function paintRight(el,data) {
      var rightText = ["新增","未派出","待出图","已确图","未下单","已下单"];
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
        ctx.fillText(rightText[i],num1*(2*i+1)+25,55*5.3);
      }
      // 数据
      for (var i = 0 ;i<data.length;i++) {
        ctx.beginPath();
        ctx.fillStyle = "#8ac3fa";
        ctx.fillRect(num1*(2*i+1),275,el.width*60/685,-data[i])
        ctx.fill();
        ctx.beginPath();
        ctx.font = "14px 微软雅黑";
        ctx.fillStyle = "#8ac3fa";
        ctx.textAlign = "center";
        ctx.fillText(data[i],num1*(2*i+1)+30,275*(1-data[i]/275)-10)
      }
    }
    paintLeft(canv,leftData);
    paintRight(canv1,rightData);
  }
}
