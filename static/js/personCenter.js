import Canvas from './canvasPub'
export default {
  name: 'PersonCenter',
  data(){
    return {
      screenWidth: $('.w2-left').width(),//获取窗口大小
      show1:true,
      show2:true,
      value1: '',
      value2:'',
      leftData:[65,82,36,236,125],
      rightData:[26,40,20,63,45,45],
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
      console.log(1)
      $(e).siblings('div').find('input').focus()
    },
    toUrl(){
      this.$router.push('/indexWrap/myProject')
    },
    change(val){
      let that = this
      let canv = $('#canvas1')[0]
      let token = localStorage.getItem('user-data')?JSON.parse(localStorage.getItem('user-data')).token:this.$store.state.login.token
      let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
      this.$api.axiosPost('/person/orderStats',1,{
        searchDateStart:val[0],
        searchDateEnd:val[1],
        token:token,
        userId:userId
      },function (res) {
        var data = res.data.attributes
        that.leftData = [data.peddingAudit,data.hasReturned,data.hasQuotedPrice,data.hasDeliver,data.hasFinished]
        Canvas.paintLeft(canv,that.leftData);
      })
    },
    change1(val){
      let that = this
      var canv1 = $('#canvas2')[0];
      let token = localStorage.getItem('user-data')?JSON.parse(localStorage.getItem('user-data')).token:this.$store.state.login.token
      let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
      this.$api.axiosPost('/person/getClientStats',1,{
        searchDateStart:val[0],
        searchDateEnd:val[1],
        token:token,
        userId:userId
      },function (res) {
        console.log(res)
        var data = res.data.attributes
        that.rightData = [data.inTouch,data.hasSended,data.hasMeasured,data.hasScheme,data.hasChecked,data.hasOrder]
        Canvas.paintRight(canv1,that.rightData);
      })
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
    // this.$store.dispatch('login/getUserInfo')
    let token = JSON.parse(localStorage.getItem('user-data')).token;
    let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
    console.log(userId)
    this.$api.axiosPost('/person/getUserAchievement',1, {
        token: token,
        userId: userId
      }
      ,function (res) {
        console.log(res)
      })
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenWidth = $('.w2-left').width();
        canv.width = ($('.w2-left').width()*0.80);
        canv1.width = ($('.w2-left').width()*0.80)
        Canvas.paintLeft(canv,this.leftData);
        Canvas.paintRight(canv1,this.rightData);
      })()
    }
    var canv = $('#canvas1')[0];
    var canv1 = $('#canvas2')[0];
    that.screenWidth = $('.w2-left').width();
    canv.width = ($('.w2-left').width()*0.80)
    canv1.width = ($('.w2-left').width()*0.80)
    Canvas.paintLeft(canv,this.leftData);
    Canvas.paintRight(canv1,this.rightData);
  }
}
