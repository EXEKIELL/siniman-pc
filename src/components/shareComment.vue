<template>
  <div id="shareComment">
    <div class="wrap">
      <div class="list clearFix" v-for="(item,index) in postList.list" :key="index">
        <div class="list-1">
          <div style="overflow: hidden;">
            <img style="border-radius:initial;" :src="item.user_id.headerimg == ''?'../../static/img/head05.png':item.user_id.headerimg" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span></span><span>{{item.user_id.username}}</span></div>
          </div>
          <div class="huifu">
            <p>{{item.content}}</p>
            <div class="huifu1" v-if="item.massagelist.length>0">
              <div class="huifuList" v-for="(item2,index2) in item.massagelist" :key="index2">
                <div><span style="min-width: 105px;">{{item2.user_id.username}}：</span><span>{{item2.content}}</span></div>
                <div><span>{{item2.create_time}}</span></div>
              </div>
            </div>
          </div>
          <div class="writeWrap" v-if="replyIt">
            <div class="ww1">
              <div>
                <div>回复邱梓佳：</div>
                <textarea></textarea>
              </div>
            </div>
            <div class="ww2">
              <button>保存</button>
              <button>取消</button>
            </div>
          </div>
        </div>
        <!--<div class="list-4">-->
          <!--<div><span>{{item.create_time}}</span></div>-->
          <!--<div><span></span><span @click="huifu(index)">回复</span></div>-->
        <!--</div>-->

      </div>


    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="postList.total_page*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareComment",
      data(){
        return {
          postList:[],
          replyIt:false
        }
      },
      methods:{
        huifu(val){
          console.log(val)
          console.log($('#shareComment .list')[val])
          let writeWrap = $(event.target).parents('.list-4').siblings('.list-2').find('.huifu')
        }
      },
      filters:{
        date:function (val) {
          let date = new Date(val),
            yyyy = date.getFullYear(),
            mm = date.getMonth()+1,
            dd = date.getDay(),
            date1;
          if(mm<10){
            mm = '0'+mm;
          }
          if(dd<10){
            dd = '0'+dd;
          }
          date1 = yyyy+'-'+mm+'-'+dd;
          return date1
        }
      },
      mounted(){
        const that = this;
        const productId = this.$router.history.current.query.productId;
        // this.$api.axiosGet('/comment/commentList'+that.$store.state.login.str1,{
        //   productId:8,
        //   parentId:1
        // },function (res) {
        //   console.log(res);
        //   that.postList = res.data;
        // })
        this.$ajax.axiosGet('/pro/commentList',3,{
          proid:productId,
          page:1
        },function (res) {
          console.log(res);
          if(res.data.status == 200){
            that.postList = res.data.data;
            console.log(that.postList);
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareComment";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
