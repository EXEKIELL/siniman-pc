<template>
    <div id="messageManage">
      <div class="bj">
        <div class="wrap">
          <div class="list" v-for="(item,index) in dataList" :key="index">
            <div>
              <div>
                <img :src="item.img" alt="">
              </div>
              <div>
                <div><span>{{item.name}}</span><span>{{item.message}}</span></div>
                <div><span @click="navTo(index)">查看系统消息>></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MessageManage",
      data(){
        return {
          dataList:[
            {img:'../../static/img/icon30.png',name:'系统消息',message:3},
            {img:'../../static/img/icon31.png',name:'订单消息',message:2},
            {img:'../../static/img/icon32.png',name:'客户跟进',message:3},
            {img:'../../static/img/icon33.png',name:'预约设计',message:8},
            {img:'../../static/img/icon34.png',name:'积分消息',message:6},
            {img:'../../static/img/icon35.png',name:'活动消息',message:2},
          ]
        }
      },
      methods:{
        navTo(index){
          this.$router.push({path:"/indexWrap/messageXq",query:{index:index}})
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/messageManage";
</style>
