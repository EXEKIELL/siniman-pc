<template>
    <div id="messageManage">
      <div class="bj">
        <div class="wrap">
          <div class="list" v-for="(item,index) in dataList" :key="index">
            <div v-show="item.show">
              <div>
                <img :src="item.img" alt="">
              </div>
              <div>
                <div>
                  <span>{{item.name}}</span>
                  <span v-show="item.message>=1">{{item.message>=99?"99+":item.message }}</span>
                </div>
                <div><span @click="navTo(item.type)">查看{{ item.name }}>></span></div>
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
            {type:"system",img:'./static/img/icon30.png',name:'系统消息',message:0,show:true},
            {type:"reservation",img:'./static/img/icon33.png',name:'预约设计',message:0,show:true},
            {type:"integral",img:'./static/img/icon34.png',name:'积分消息',message:0,show:true},
            {type:"activity",img:'./static/img/icon35.png',name:'活动消息',message:0,show:true},
            {type:"",img:'./static/img/icon31.png',name:'订单消息',message:0,show:false},
            {type:"",img:'./static/img/icon32.png',name:'客户跟进',message:0,show:false},
          ]
        }
      },
      methods:{
        navTo(index){
          this.$router.push({path:"/indexWrap/messageXq",query:{type:index}})
        },
        getStatic(type,fun){
          this.$api.axiosPost('/msg/msgStatis',1,{
            data:{
              type_code:type,
              status:0
            },
            page:{
              pageNum:1,
              pageSize:10
            }
          },function(res){
             fun(res)
          })
        }
      },
      mounted(){
        let that=this
        this.getStatic("system",function(res){
          that.dataList[0].message=res.data.data
        })
        this.getStatic("reservation",function(res){
          that.dataList[1].message=res.data.data
        })
        this.getStatic("integral",function(res){
          that.dataList[2].message=res.data.data
        })
        this.getStatic("activity",function(res){
          that.dataList[3].message=res.data.data
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/messageManage";
</style>
