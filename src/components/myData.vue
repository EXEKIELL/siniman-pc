<template>
    <div id="myData">
      <div class="wrap">
        <div class="list1">
          <div>
            <div>
              <div style="overflow: hidden">
                <img :src="userdata.img==''?headimg:userdata.img" alt="">
              </div>
            </div>
            <div>
              <div>
                <span>{{userdata.username}}</span>

                <span style="color: #999" v-for="(item,index) in roles" :key="index" v-if="index<=0">{{item.name}}</span>

              </div>
              <div class="icon phone"><span></span><span>{{userdata.phone}}</span></div>
              <div class="icon account"><span></span><span>账号：</span><span>{{userdata.account}}</span></div>
              <div class="icon shop"><span></span><span>门店：</span><span>{{shopName}}</span></div>
            </div>
          </div>

          <div class="sater">
            <div>
              <div class="huozan">
                <span>获赞</span><span>{{userdata.goodcount==null?0:userdata.goodcount}}</span>
              </div>
              <router-link tag="div" class="zuop" to="/indexWrap/myProjectIndex">
                <span>作品</span><span>{{userdata.productCount==null?0:userdata.productCount}}</span>
              </router-link>
              <router-link tag="div" class="yuyue" to="/indexWrap/messageXq?type=reservation">
                <span>预约</span><span>{{userdata.bespeakcount==null?0:userdata.bespeakcount}}</span>
              </router-link>

            </div>
          </div>
        </div>
        <div class="list2">
          <div @click="toUrl('积分明细')">
            <div>
              <img src="../../static/img/icon34.png" alt="">
            </div>
            <div>
              <div>积分明细</div>
              <div>点击进入>></div>
            </div>
            <span></span>
          </div>
          <div @click="toUrl('设计方案')">
            <div>
              <img src="../../static/img/icon53.png" alt="">
            </div>
            <div>
              <div>设计方案</div>
              <div>点击进入>></div>
            </div>
            <span></span>
          </div>
          <div @click="toUrl('消息管理')">
            <div>
              <img src="../../static/img/icon54.png" alt="">
            </div>
            <div>
              <div>消息管理</div>
              <div>点击进入>></div>
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyData",
      data(){
        return {
          headimg:'./static/img/head05.png',
          userdata:'',//JSON.parse(localStorage.getItem('user-info')).data,
          roles:'',//,
          shopName:''
        }
      },
      methods:{
        onshow(){
          $('.idendity').show()
        },
        onhide(){
          $('.idendity').hide()
        },
        toUrl(text){

          if(text == '积分明细'){
            this.$router.push('/indexWrap/integralDetail')
          }else if(text == '设计方案'){
            this.$router.push('/indexWrap/myProjectIndex')
          }else{
            this.$router.push('/indexWrap/messageManage')
          }
        }
      },
      mounted(){
        const that = this

        that.userdata = JSON.parse(localStorage.getItem('user-info'));

        let shopId = this.userdata.shops.split(",");

        this.$api.axiosPost('/shop/shopDetail',1,{
          shopId:shopId[0]
        },function (res) {

          that.shopName = res.data.data.shopname
        })
        that.roles =JSON.parse(that.userdata.roles);

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myData";
</style>
