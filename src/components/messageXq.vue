<template>
    <div id="messageXq" v-loading.body="listLoading">
      <div class="wrap">
        <div class="nav">
          <ul>
            <li v-for="(item,index) in navLists" :key="index"><span @click="navSel(item.type)" :class="{sel:item.type==msgType}">{{item.text}}</span></li>
          </ul>
        </div>
        <div class="content">
          <ul>
            <li class="clearFix" v-for="(item,index) in msgList" :key="index">
              <div>
                <img v-for="(item1,index1) in icons" v-if="item1.type == item.typeCode" :key="index1" :src="item1.url" alt="">
              </div>
              <div>
                <div><span :class="{news:updateStatus(item.status,item.id,index)}">{{item.msgtype}}</span></div>
                <div><span>{{item.msg}}</span></div>
                <div></div>
                <div>
                  <a v-if="item.openType==1" v-show="item.link!=''" :href="item.link">点击查看</a>
                  <a v-if="item.openType==2" href="javascript:;" @click="receive(item.link,item.id,index)">点击领取</a>

                  <a v-if="item.openType==3 && item.link" href="javascript:;" style="color: #333">已领取</a>
                </div>
                <div><span>{{ newtime(item.createtime)}}</span></div>
              </div>
            </li>
          </ul>
          <button class="taskButton" v-if="msgType=='task' && msgList.length>=1" @click="receivelist">一键领取</button>
        </div>
        <div class="pagina" v-if="page===1">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :current-page="currentpage"
            @current-change="pageChange"
            :total="last_page*10">
          </el-pagination>
        </div>

      </div>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    export default {
      name: "MessageXq",
      data(){
        return {
          navLists:[
            {text:"全部",selClass:true,type:null},
            {text:"系统消息",selClass:false,type:"system"},
            {text:"预约设计",selClass:false,type:"reservation"},
            {text:"积分消息",selClass:false,type:"integral"},
            {text:"活动消息",selClass:false,type:"activity"},
            {text:"待领取积分",selClass:false,type:"task"},
          ],
          icons:[
            {url:'./static/img/icon41.png',name:'系统消息',type:"system"},
            {url:'./static/img/icon44.png',name:'预约设计',type:"reservation"},
            {url:'./static/img/icon45.png',name:'积分消息',type:"integral"},
            {url:'./static/img/icon46.png',name:'活动消息',type:"activity"}
          ],
          msgType:null,
          msgList:[],
          page:1,
          last_page:1,
          currentpage:1,
          listLoading:false,
        }
      },
      methods:{
        navSel(index){
          let that = this
          that.msgType=index
          this.page=0
          this.pageChange(1)
        },
        getMore(){
          let page = this.page;
          const that = this;
          const userId = this.$store.state.login.userId;
          page++;

        },
        pageChange(val){
          let that = this
          that.listLoading=true
          that.$api.axiosPost('/msg/msgList',1,{
              data:{
                type_code:that.msgType=="task"?"integral":that.msgType,
                open_type:that.msgType=="task"?2:null
              },
              page:{
                pageNum:val,
                pageSize:that.msgType=="task"?10:5
              }
          },function(res){
            let data=res.data.data
            that.page=1
            that.last_page=data.last_page

            that.msgList=data.list

            that.listLoading=false
            setTimeout(function () {
              let len=that.msgList.length
              for(let item=0;item<len;item++){
                if(that.msgList[item].status==0){
                  that.$api.axiosPost('/msg/updateStatus',1,{
                    id: that.msgList[item].id
                  },function(res){
                    that.msgList[item].status=1
                  })
                }
                if(item+1==len){
                  that.$api.axiosPost('/msg/msgStatis',1,{},function (res) {
                    if(res.data.status === 200){
                      if(res.data.data>=99){
                        that.$store.state.login.msgcount='99+'
                      }else{
                        that.$store.state.login.msgcount=res.data.data
                      }

                    }
                  })
                }
              }

            },2000)


          })
        },
        newtime(val){
          let date=new Date(val)
          return this.$api.formatDate(date,'yyyy-MM-dd hh:mm')
        },
        updateStatus(val,id,index){
            let that=this
            if(val==0){
              /**去改变消息状态**/
              return true
            }else{
              return false
            }
        },
        /*一键领取*/
        receivelist(){
          let that=this
          that.listLoading=true
          let lists=that.msgList

          for (let i=0;i<lists.length;i++){
            let openType=lists[i].openType
            if(openType==2){
              let links=lists[i].link.split("/")
              let ids=links[5].split(".")
              let id=ids[0]
              let msgId=lists[i].id

              that.$api.axiosPost('/msg/receive',1,{
                id: id,
                msgId:msgId
              },function(res){

              })
            }
            Message.success("领取成功")
            that.listLoading=false
            setTimeout(function () {
              that.pageChange(1)
            },1000)

          }

        },
        /*单个领取*/
        receive(link,msgId,index){
          let that=this
          let links=link.split("/")
          let ids=links[5].split(".")
          let id=ids[0]
          that.$api.axiosPost('/msg/receive',1,{
            id: id,
            msgId:msgId
          },function(res){
            Message.success("领取成功")

            that.msgList[index].openType=3
          })

        }
      },
      filters:{
        time:function (val) {

          let time = new Date(val)

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
        let that = this;
        let type = this.$router.history.current.query.type;

        this.msgType=type
        this.pageChange(1)

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/messageXq";
  #messageXq{
    font-size: 14px;
  }
  .msgtype{
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
  .content{position: relative}
  .taskButton{
    position: absolute;
    top: 14px;
    right: 59px;
    padding: 7px 10px;
    color:  #fff;
    background-color: #409EFF;
    font-size: 16px;
  }
</style>
