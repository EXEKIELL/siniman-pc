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
      ]
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
        canv.width = ($('.w2-left').width()*0.80)
        paint();
      })()
    }
    var canv = $('#canvas1')[0];
    that.screenWidth = $('.w2-left').width();
    canv.width = ($('.w2-left').width()*0.80)
    function paint() {

      var ctx = canv.getContext('2d');
      var num = 0;
      var num1 = canv.width/11;
      for (var i = 0;i<6;i++) {
        ctx.beginPath();
        ctx.moveTo(0,num)
        ctx.lineTo(canv.width,num);
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = '#f6f6f6';
        ctx.stroke();
        num+=55;
      }
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(0,canv.height-45);
      ctx.stroke()
      ctx.beginPath();
      ctx.moveTo(canv.width,0);
      ctx.lineTo(canv.width,canv.height-45);
      ctx.stroke();
      for (var i = 0; i < 5; i++) {
        console.log(canv.width)
        ctx.beginPath();
        ctx.fillStyle = '#f6f6f6';
        ctx.fillRect(num1*(2*i+1),0,canv.width*65/685,275);
        ctx.fill();
      }
    }
    paint();
  }
}
