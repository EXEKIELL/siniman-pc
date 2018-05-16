<template>
    <div id="messageXq">
      <div class="wrap">
        <div class="nav">
          <ul>
            <li v-for="(item,index) in navLists" :key="index"><span @click="navSel(index)" :class="{sel:item.selClass}">{{item.text}}</span></li>
          </ul>
        </div>
        <div class="content">
          <ul>
            <li class="clearFix" v-for="(item,index) in postList.list" :key="index">
              <div>
                <img v-for="(item1,index1) in icons" v-if="item1.name == item.msgtype" :key="index1" :src="item1.url" alt="">
              </div>
              <div>
                <div><span>{{item.msgtype}}</span></div>
                <div><span>{{item.msg}}</span></div>
                <div class="cont-wrap"></div>
                <div><a href="#"></a></div>
                <div><span>{{item.createtime|time}}</span></div>
              </div>
            </li>
            <li class="clearFix">
              <div>
                <img src="../../static/img/icon42.png" alt="">
              </div>
              <div>
                <div><span>订单消息</span></div>
                <div><span>您的订单：10018662564   被驳回，请及时查看并处理。</span></div>
                <div>
                  <div>
                    <div><span>诗尼曼华东区接单-张敏</span><span>2017.12.20   15：00</span></div>
                    <div><span>订单处理说明：</span><span>合同报价有问题，橱柜柜体每增加一公分，每公分需增加￥500.00，请进入对应订单重新修改订单合同金额后提交 。</span></div>
                  </div>
                </div>
                <div><a href="#">查看订单信息：https://www.baidu.com</a></div>
                <div><span>2017.12.20  15：00</span></div>
              </div>
            </li>
            <li class="clearFix">
              <div>
                <img src="../../static/img/icon43.png" alt="">
              </div>
              <div>
                <div><span>客户跟进</span></div>
                <div><span>客户（张小姐）已经确认图纸三天了，赶紧去下单吧~</span></div>
                <div></div>
                <div><a href="#">查看订单信息：https://www.baidu.com</a></div>
                <div><span>2017.12.20  15：00</span></div>
              </div>
            </li>
            <li class="clearFix">
              <div>
                <img src="../../static/img/icon44.png" alt="">
              </div>
              <div>
                <div><span>预约设计</span></div>
                <div><span>有客户（2017.12.28  15：00）预约了您进行量房、效果图设计，请尽快跟进。</span></div>
                <div></div>
                <div><a href="#">查看订单信息：https://www.baidu.com</a></div>
                <div><span>2017.12.20  15：00</span></div>
              </div>
            </li>
            <li class="clearFix">
              <div>
                <img src="../../static/img/icon45.png" alt="">
              </div>
              <div>
                <div><span>积分消息</span></div>
                <div><span>诗尼曼高级设计师-张敏，向您支付了50积分，兑换了您的设计方案《广州恒大御府02户型》</span></div>
                <div></div>
                <div><a href="#">查看订单信息：https://www.baidu.com</a></div>
                <div><span>2017.12.20  15：00</span></div>
              </div>
            </li>
            <li class="clearFix">
              <div>
                <img src="../../static/img/icon46.png" alt="">
              </div>
              <div>
                <div><span>活动消息</span></div>
                <div><span>诗尼曼全国门店设计周，获奖用户前十名可获得由诗尼曼总部送出的精美礼品，最高可获得￥1000.00现金奖励，猛搓下主链接报名~</span></div>
                <div></div>
                <div><a href="#">查看订单信息：https://www.baidu.com</a></div>
                <div><span>2017.12.20  15：00</span></div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button>加载更多</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MessageXq",
      data(){
        return {
          navLists:[
            {text:"全部",selClass:true},
            {text:"系统消息",selClass:false},
            {text:"订单消息",selClass:false},
            {text:"客户跟进",selClass:false},
            {text:"预约设计",selClass:false},
            {text:"积分消息",selClass:false},
            {text:"活动消息",selClass:false},
          ],
          icons:[
            {url:'../../static/img/icon41.png',name:'系统消息'},
            {url:'../../static/img/icon42.png',name:'订单消息'},
            {url:'../../static/img/icon43.png',name:'客户跟进'},
            {url:'../../static/img/icon44.png',name:'预约设计'},
            {url:'../../static/img/icon45.png',name:'积分消息'},
            {url:'../../static/img/icon46.png',name:'活动消息'}
          ],
          msgType:null,
          postList:[]
        }
      },
      methods:{
        navSel(index){
          var e = event.target
          for (var i = 0; i < this.$data.navLists.length; i++) {
            this.$data.navLists[i].selClass = false;
          }
          console.log(2)
          // $(e).parent('li').siblings('li').find('span').removeClass('sel')
          this.$data.navLists[index].selClass = true;
        }
      },
      filters:{
        time:function (val) {
          let time = new Date(val);
          let yyyy = time.getFullYear(),
              mm = time.getMonth()+1,
              dd = time.getDay(),
              h = time.getHours(),
              min = time.getMinutes();
          let time1 = yyyy+'.'+mm+'.'+dd+' '+h+':'+min
          return time1
        }
      },
      mounted(){
        const that = this;
        const userId = this.$store.state.login.userId;
        this.$api.axiosPost('/msg/msgList'+that.$store.state.login.str1,1,{
          data:{
            userId:userId,
            msgType:null
          },
          page:{
            pageNum:1,
            pageSize:10
          }
        },function (res) {
          console.log(res)
          that.postList = res.data
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/messageXq";
</style>
