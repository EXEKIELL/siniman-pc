import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import VueQArt from 'vue-qart'
export default {
  components:{
    VueQArt
  },
  name: 'PersonCenter',
  data(){
    return {
      userId:'',
      token:'',
      str1:'',
      screenWidth: $('.w2-left').width(),//获取窗口大小
      show1:true,
      show2:true,
      value1: '',
      value2:'',
      leftData:[3,0,0,0,0],
      rightData:[5,3,2,0,0,0],
      headLeft: {
        src:"../../static/img/hlicon.png",
        text:"个人中心"
      },
      swiperList:[],
      tagList:[],
      aaa:"aaa",
      tags:[],
      postData:{},
      contList:[],
      showUser:false,
      totalPage:null,
      postTags:[],
      orderByField:'salsecount',
      list01:[
        {
          productname:'方案名称',
          housetype:'四方一厅',
          area:121,
          customername:'客户名称',
          customercontact:'1380013800',
          customeraddr:'客户地址'
        }
      ],
      today:'选择日期',
      firstDay:'结束日期',
      orderStats:{
        list:{},
        lastList:{}
      },
      clientStats:{
        list:{},
        lastList:{}
      },
      config: {
        value: "",
        filter: 'color',
        imagePath:'./static/img/logo01.png',
        version:1,
      },
      downloadButton: false,
      dialogFormVisible:false,
      today2:'',
      ago:'',
      list1:{
        total:0,
        obtain:0,
        consume:0
      },
      listLoading:false,
      lodingstr:'加载中...'
    }
  },
  methods:{

    navSel(val,val1){
      $('.clearFix').find('.nav-right div').on("click",function(){
        $(this).parent().find('div').removeClass("sel")
        $(this).children('div').addClass("sel")
      })


      //  标签筛选
      if(val != '全部'){
        this.tags[val+''] = val1
      }else{
        delete this.tags[val1+'']
      }
      let that = this
      let tags1 = [];
      this.postTags = []
      for (var key in this.tags) {
        var index = key,
          index1 = this.tags[key]
        this.postTags.push(that.tagList[index].lists[index1].id)
      }

      // //标签查询方案库分页查询

      this.pageChange(1)
    },
    dianwo(){
      var e = window.event.target;
      console.log(1)
      $(e).siblings('div').find('input').focus()
    },
    phoneStr(str){
      if(str){
        let str2 = str.substr(0,3)+"****"+str.substr(7);
        return str2;
      }

    },
    toUrl(val){
      let routeData=this.$router.resolve({path:'/indexWrap/myProject',query:{productId:val}})
      window.open(routeData.href, '_blank');
    },
    share(id){
      /*生成二维码*/
      let url=this.$api.mobileUrl+"?id="+id
      this.config.value=url
      this.dialogFormVisible=true
      // console.log(this.config.value)
    },
    diaclose(){
      this.dialogFormVisible=false
      this.config.value=''
    },
    change(val){
      let that = this
      /*当月*/
      this.$api.axiosPost('/userinfo/getOrderStats',1,{
        searchDateStart:val[0],
        searchDateEnd:val[1]
      },function (res) {
        let data = res.data.data
        that.orderStats.list=data;

        /*上月*/
        that.$api.axiosPost('/userinfo/getOrderStats',1,{
          searchDateStart:that.$api.getPreMonth(val[0]),
          searchDateEnd:that.$api.getPreMonth(val[1])
        },function (res) {
          let data = res.data.data
          that.orderStats.lastList=data;
          that.setOption()
        })

      })


    },
    change1(val){
      let that = this
      /*当月*/
      this.$api.axiosPost('/userinfo/getClientStats',1,{
        searchDateStart:val[0],
        searchDateEnd:val[1]
      },function (res) {
        let data = res.data.data
        that.clientStats.list=data
        /*上月*/
        that.$api.axiosPost('/userinfo/getClientStats',1,{
          searchDateStart:that.$api.getPreMonth(val[0]),
          searchDateEnd:that.$api.getPreMonth(val[1])
        },function (res) {
          let data = res.data.data
          that.clientStats.lastList=data
          that.setOption2()

        })

      })


    },
    pageChange(val){
      const that = this;
      // //获取方案列表
      that.postData.list=[]
      this.listLoading=true
      this.$api.axiosPost('/product/productList',1,{
        data:{
          prostatus:1,
          orderByCondition:'DESC',
          orderByField:that.orderByField,
          tags:that.postTags,
        },
        page:{
          pageNum:val,
          pageSize:9
        }
      },function (res) {
        that.listLoading=false
        let data = res.data.data;
        that.postData = data;
        if(that.postData.length<=0){
          that.lodingstr="还没有相应的方案";
        }
      })
    },
    /*去积分商城 */
    golink(){
      let sysconfig=JSON.parse(localStorage.getItem('sysconfig'))
      let userpsw=JSON.parse(localStorage.getItem('userpsw'))
      window.open(sysconfig.points_mall.value+'?username='+userpsw.user+'&password='+userpsw.psw)
    },
    setOption:function(){

      let chart = document.getElementById('canvas1');

      let echart = echarts.init(chart);
      let OrderStats=this.orderStats.list
      let LastStats=this.orderStats.lastList

      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        toolbox: {
          show : true,
          feature : {
            saveAsImage : {show: true}
          }
        },
        legend: {
          data:['当月','上月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            min:0,
            type : 'category',
            data : ['待审核','审核中','生产中','已发货','已收货','已安装','已完成','已退回']
          }
        ],
        yAxis : [
          {
            min:0,
            type : 'value'
          }
        ],
        series : [
          {
            name: '当月',
            type: 'bar',
            data: [
              OrderStats.peddingAudit,
              OrderStats.auditing,
              OrderStats.producing,
              OrderStats.hasDeliver,
              OrderStats.hasReceived,
              OrderStats.hasInstalled,
              OrderStats.hasFinished,
              OrderStats.hasReturned
            ]
          },
          {
            name: '上月',
            type: 'bar',
            data: [
              LastStats.peddingAudit,
              LastStats.auditing,
              LastStats.producing,
              LastStats.hasDeliver,
              LastStats.hasReceived,
              LastStats.hasInstalled,
              LastStats.hasFinished,
              LastStats.hasReturned
            ]
          }
        ]
      }
      echart.setOption(option)
    },
    setOption2:function(){
      let chart = document.getElementById('canvas2');
      let echart = echarts.init(chart);
      let clientStats=this.clientStats.list
      let LastStats=this.clientStats.lastList
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        toolbox: {
          show : true,
          feature : {
            saveAsImage : {show: true}
          }
        },
        legend: {
          data:['当月','上月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            min:0,
            type : 'category',
            data : ['新建','已派尺','已测量','已方案','已查房','已下单','已完成']
          }
        ],
        yAxis : [
          {
            min:0,
            type : 'value'
          }
        ],
        series : [
          {
            name: '当月',
            type: 'bar',
            data: [
              clientStats.inTouch,
              clientStats.hasSended,
              clientStats.hasMeasured,
              clientStats.hasScheme,
              clientStats.hasChecked,
              clientStats.hasOrder,
              clientStats.hasFinished,
            ]
          },
          {
            name: '上月',
            type: 'bar',
            data: [
              LastStats.inTouch,
              LastStats.hasSended,
              LastStats.hasMeasured,
              clientStats.hasScheme,
              LastStats.hasChecked,
              LastStats.hasOrder,
              LastStats.hasFinished,
            ]
          }
        ]
      }
      echart.setOption(option)
    }
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val
    }
  },
  filters:{
    customeraddr:function(val){
      if(val){
        if(val.length>=7){
          return val.substr(0,7)+'...'
        }else{
          return val
        }
      }
      return ''
    }
  },
  beforeUpdate(){

  },
  mounted(){
    const that = this

    this.str1 = this.$store.state.login.str1;
    let swiper1 = new Swiper('#swiper1',{
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop:true,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next'
    })

    let date=new Date()
    let today=this.$api.formatDate(date,'yyyy-MM-dd')
    this.today=today
    date.setDate(1)
    let firstDay=this.$api.formatDate(date,'yyyy-MM-dd')
    this.firstDay=firstDay
    //获取业绩统计
    this.change([firstDay,today])
    this.change1([firstDay,today])
    this.pageChange(1)

    //  banner图获取
    this.$api.axiosPost('/img/getImgListByParam',1,{
      data:{
        imgType:1
      },
      page:{
        pageNum:1,
        pageSize:1
      }
    },function (res) {
      that.swiperList = res.data.data
    })

    // //标签获取
    this.$api.axiosPost('/tag/getTagList',1,{},function (res) {

      that.tagList = res.data.data
    })

    let date2=new Date();
    that.today=that.$api.formatDate(date2,'yyyy.MM.dd')
    date2.setMonth( date.getMonth()-3 );
    that.ago=that.$api.formatDate(date2,'yyyy.MM.dd')

    // //用户积分统计
    this.$api.axiosPost('/person/getUserScore',1,{
      searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
      searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
      type:2, //全部
    },function (res) {
      that.list1.total=res.data.data.score
    });

    this.$api.axiosPost('/person/getUserScore',1,{
      searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
      searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
      type:0, //获取
    },function (res) {
      that.list1.obtain=res.data.data.score
    });

    this.$api.axiosPost('/person/getUserScore',1,{
      searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
      searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
      type:1, //消耗
    },function (res) {
      that.list1.consume=Math.abs(res.data.data.score)
    });
  }
}
