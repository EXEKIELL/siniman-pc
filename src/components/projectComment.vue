<template>
  <div id="projectComment">
    <div class="wrap">

      <div class="list clearFix" v-for="(item,index) in commentList">
        <div class="list-1">
          <div class="headerImg">
            <img :src="item.userImg" alt="" onerror="'../../static/img/head05.png'">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div>
              <span style="display: none"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>{{ item.username }}</span></div>
          </div>
          <div class="huifu">
            <p>{{ item.content }}</p>

            <div class="huifuBox" v-if="item.huifu">
              <el-input
                type="textarea"
                :rows="2"
                v-model="item.huifu.huifuContent"
                :placeholder="'回复'+item.username+'：'">
              </el-input>
              <div class="huifuButton">
                <el-button type="primary" @click="submitHuifu(item.huifu,index)">保存</el-button>
                <el-button type="info" plain @click="huifuBox(index,item.msgid)">取消</el-button>
              </div>
            </div>

            <div class="huifu1" v-for="(vla,index2) in item.comments">
              <div class="huifuList">
                <div><span>{{ vla.username }}：</span><span>{{ vla.content }}</span></div>
                <div><span> <span class="delete_conment" @click="delete1(vla.id,vla.userId,index,index2)">删除</span> | {{ getDate(vla.createTime) }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-4">
          <div><span>{{ getDate(item.createTime) }}</span></div>
          <div style="margin-top: 10px"  @click="huifuBox(index,item.id,item.userId)"><span></span><span>回复</span></div>
        </div>
      </div>
    </div>
    <div class="pagina">
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
    import {Message,MessageBox} from "element-ui"
    export default {
      name: "ProjectComment",
      props:["productId"],
      data(){
        return{
          commentList:[],
          last_page:1,
          username:''
        }
      },
      mounted(){
        let that=this
        let user_info=JSON.parse(localStorage.getItem("user-info"))
        this.username=user_info.username
        that.getList(1)
      },
      methods:{
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
            that.$forceUpdate();
          })
        },
        huifuBox(index,msgid,userId){
          let that=this
          that.$forceUpdate();
          if(that.commentList[index].huifu){
            that.commentList[index].huifu=false
          }else{
            that.commentList[index].huifu={
              huifuContent:'',
              msgid:msgid,
              index:index,
              userId:userId,
              username:that.username,
            }
          }
        },
        /**评论删除*/
        delete1(id,userId,index,index2){
          let that=this
          MessageBox.confirm('此操作将永久删除该回复, 是否继续?','温馨提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            that.$api.axiosPost('proconment/delect',1,{
              data:{
                id:id,
                user_id:userId
              },
              page:{
                pageNum:1,
                pageSize:1
              }
            },function(res){
              that.commentList[index].comments.splice(index2,1)
            });
          }).catch(() => {

          });

        },
        submitHuifu(item,index){
          let that=this
          let date=new Date()
          that.loading=true
          // that.$forceUpdate();
          if(!item.huifuContent){
            Message.error("请输入您的回复")
            return false
          }

          that.$api.axiosPost('proconment/addcomment',1,{
            data:{
              msgType:1,
              pro_id:that.productId,
              is_reply:1,
              parent_id:item.msgid,
              parent_uid:item.userId,
              content:item.huifuContent,
              username:item.username,
            },
            page:{
              pageNum:1,
              pageSize:1
            }
          },function(res){
            that.loading=false
            let resData=res.data.data
            console.log(resData)
            that.commentList[index].comments.unshift({
              username:resData.username,
              content:resData.content,
              userId:resData.user_id,
              id:resData.id,
              createTime:that.$api.formatDate(date,"yyyy-MM-dd hh:mm:ss")
            })

            that.commentList[index].huifu=false
          })
        },
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/projectComment";
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
