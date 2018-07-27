<template>
  <div id="shareComment">

    <div class="huifuBox">
      <h1 style="display: none">评论（{{ count }}）</h1>
      <el-input
        class="messageInput"
        label=""
        v-model="huifuContent"
        type="textarea"
        :rows="4"
        resize="none"
        style="width: 98%"
        placeholder="评论留言：">
      </el-input>
      <div class="huifuButton">
        <el-button style="width: 200px;height: 60px; background-color: #a51e32;font-size: 18px;color: #fff"
                   @click="submitHuifu()">评论留言</el-button>
      </div>
    </div>

    <div class="wrap">
      <div class="list clearFix" v-for="(item,index) in commentList">
        <div class="list-1">
          <div class="headerImg">
            <img :src="item.userImg" alt="" onerror="this.src='./static/img/head05.png'">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span style="display: none"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>{{ item.username }}</span></div>
          </div>
          <div class="huifu">
            <p>{{ item.content }}</p>

            <div class="huifu1" v-for="(vla,index2) in item.comments">
              <div class="huifuList">
                <div><span style="color: #a51e32">{{ vla.username }}</span>：<span>{{ vla.content }}</span></div>
                <div><span> {{ getDate(vla.createTime) }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-4">
          <div><span>{{ getDate(item.createTime) }}</span></div>
          <div style="margin-top: 10px;display: none"><span></span><span>回复</span></div>
        </div>
      </div>
    </div>
    <div class="pagina" v-if="commentList.length !=0">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="pageChange"
        :total="last_page*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareComment",
      data(){
        return {
          commentList:[],
          last_page:1,
          username:'',
          productId:'',
          count:0,
          huifuContent:''
        }
      },
      methods:{
        huifu(val){
          console.log(val)
          console.log($('#shareComment .list')[val])
          let writeWrap = $(event.target).parents('.list-4').siblings('.list-2').find('.huifu')
        },
        getDate(str){
          let that=this
          let timeStr=str.replace(/-/g,':').replace(' ',':')
          let time=timeStr.split(':')
          let date=new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5])
          return that.$api.formatDate(date,"yyyy-MM-dd")

        },
        pageChange(val){
          this.getList(val)
        },
        getList(val){
          let that=this
          that.$api.axiosPost('/proconment/conmentlist',1,{
            data:{
              pro_id:that.productId,
              is_reply:0
            },
            page:{
              pageNum:val,
              pageSize:10
            }
          },function (res) {
            that.commentList = res.data.data.list
            that.last_page = res.data.data.last_page
            that.count=res.data.count
            that.$forceUpdate();
          })
        },
        submitHuifu(){
          let that=this
          let date=new Date()
          that.loading=true
          // that.$forceUpdate();
          if(!that.huifuContent){
            that.$message.error("请输入您的回复")
            return false
          }

          that.$api.axiosPost('proconment/addcomment',1,{
            data:{
              msgType:1,
              pro_id:that.productId,
              is_reply:0,
              parent_id:0,
              parent_uid:0,
              content:that.huifuContent,
              username:that.username,
            },
            page:{
              pageNum:1,
              pageSize:1
            }
          },function(res){
            that.getList(1)
          })
        },
      },
      mounted(){
        let productId = this.$router.history.current.query.productId;
        this.productId=productId
        let user_info=JSON.parse(localStorage.getItem("user-info"))
        this.username=user_info.username
        this.getList(1)
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareComment";
.headerImg{
  overflow: hidden;
}
.headerImg img{
  width:  auto !important;
  height: 100% !important;
}
.huifuButton{
  text-align: right;
  margin-top: 15px;
}
.delete_conment{
  cursor:pointer;
}

</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
