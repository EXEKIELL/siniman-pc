import Canvas from './canvasPub'
export default {
  name: 'PersonCenter',
  data(){
    return {
      userId:'',
      token:'',
      screenWidth: $('.w2-left').width(),//获取窗口大小
      show1:true,
      show2:true,
      value1: '',
      value2:'',
      leftData:[0,0,0,0,0],
      rightData:[0,0,0,0,0,0],
      headLeft: {
        src:"./static/img/hlicon.png",
        text:"个人中心"
      },
      swiperList:[],
      tagList:[],
      aaa:"aaa",
      tagsList:['','','',''],
      contList:[]
    }
  },
  methods:{
    navSel(val){
      var e = event.target;
      $(e).addClass("sel");
      $(e).parent('div').siblings('div').find('div').removeClass('sel')
      var text = val;
      var str = $(e).parents('.nav-right').siblings('.nav-left').text()
      str = str.replace(/：/,'')
      if(text == '全部'){
        text = ''
      }
      if(str=='类型'){
        this.tagsList[0] = text
      }else if(str=='阶段'){
        this.tagsList[1] = text
      }else if(str=='户型'){
        this.tagsList[2] = text
      }else{
        this.tagsList[3] = text
      }
      const that = this
      const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
      //标签查询方案库分页查询
      this.$api.axiosPost('/product/productList',1,{
        data:{
          userids:[userId],
          tags:that.tagsList,
          orderByCondition:'DESC',
          orderByField:'productionmark'
        },
        page:{
          pageNum:1,
          pageSize:9
        }
      },function (res) {
        console.log(res)
        that.contList = res.data.data
        console.log(that.contList)
      })
    },
    dianwo(){
      var e = event.target;
      console.log(1)
      $(e).siblings('div').find('input').focus()
    },
    toUrl(val){
      this.$router.push({path:'/indexWrap/myProject',query:{productId:val}})
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
        console.log(res)
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
    },
    pageChange(val){
      const that = this;
      let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
      this.$api.axiosPost('/product/productList',1,{
        data:{
          orderByCondition:'DESC',
          orderByField:'productionmark',
          userids:[userId]
        },
        page:{
          pageNum:val,
          pageSize:9
        }
      },function (res) {
        that.contList = res.data.data
      })
    }
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val
      console.log(this.screenWidth)
    }
  },
  beforeUpdate(){

  },
  mounted(){
    const that = this
    let token,userId;
    token = this.$store.state.login.token;
    userId = this.$store.state.login.userId;
    let canv = $('#canvas1')[0];
    let canv1 = $('#canvas2')[0];
    let swiper1 = new Swiper('#swiper1',{
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop:true,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next'
    })
    // this.$store.dispatch('login/getUserInfo')
    console.log(userId)
    this.$api.axiosPost('/person/getUserAchievement',1, {
        token: token,
        userId: userId
      }
      ,function (res) {
        console.log(res.data.data)
      })
    //canvas监听器
    window.onresize = () => {
      return (() => {
        that.screenWidth = $('.w2-left').width();
        canv.width = ($('.w2-left').width()*0.80);
        canv1.width = ($('.w2-left').width()*0.80)
        Canvas.paintLeft(canv,this.leftData);
        Canvas.paintRight(canv1,this.rightData);
      })()
    }
    //canvas操作
    that.screenWidth = $('.w2-left').width();
    canv.width = ($('.w2-left').width()*0.80)
    canv1.width = ($('.w2-left').width()*0.80)
    Canvas.paintLeft(canv,this.leftData);
    Canvas.paintRight(canv1,this.rightData);
    //方案库分页查询
    this.$api.axiosPost('/product/productList',1,{
      data:{
        userId:userId,
        orderByCondition:'DESC',
        orderByField:'productionmark'
      },
      page:{
        pageNum:1,
        pageSize:9
      }
    },function (res) {
      that.contList = res.data.data
      console.log(res)
    })
    //  banner图获取
    this.$api.axiosPost('/img/getImgListByParam',1,{
      data:{
        imgType:1
      },
      page:{
        pageNum:0,
        pageSize:10
      }
    },function (res) {
      that.swiperList = res.data.data
    })
    //标签获取
    this.$api.axiosGet('/tag/getTagList',{},function (res) {
      console.log(res.data)
      that.tagList = res.data
    })
  }
}
