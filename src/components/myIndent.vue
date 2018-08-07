<template>
    <div id="myIndent">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的订单</span>
        </div>
        <div class="w3-cont" v-loading.body="listLoading" style="flex-wrap: wrap;justify-content: initial;">
          <template v-if="postData.list.length>=1">
            <div class="list" v-for="(item,index) in postData.list" :key="index">
              <div class="listWrap">
                <div class="wrap_1">
                  <div class="w1_1">
                    <div class="w1-img">
                      <img :src="item.openFace" alt="" onerror="this.src='./static/img/head05.png'">
                    </div>
                    <div class="nickname">昵称:{{ item.openName }}</div>
                  </div>
                  <div class="w1_2">
                    <button v-if="item.status==0" class="statusbuton status0" @click="updateStatu(index)">未沟通</button>
                    <button v-else class="statusbuton status1">已沟通</button>
                  </div>
                </div>
                <div class="wrap_2">
                  <div class="r1"><span class="thead">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>{{ item.uname }}</div>
                  <div class="r1"><span class="thead">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</span>{{ item.mobile }}</div>
                  <div class="r1"><span class="thead">预约时间：</span>{{ item.createTime|gettime }}</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="height: 100px;line-height: 100px; width: 100%;text-align: center;font-size: 20px">
              {{ loadstr }}
            </div>
          </template>

        </div>
      </div>
      <div class="pagina">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          @current-change="change"
          :total="postData.last_page*10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    import {transformDate} from '../../static/js/personCenter.js'
    export default {
      name: "MyIndent",
      data(){
        return {
          postData:{
            list:[]
          },
          listLoading:false,
          loadstr:"加载中..."
        }
      },
      filters:{
        gettime:function (value) {
          if (!value) return ''

          let date = new Date(value);
          let yy = date.getFullYear();
          let mm = date.getMonth()+1<10?('0'+(date.getMonth()+1)):date.getMonth()+1;
          let dd = date.getDate()<10?('0'+date.getDate()):date.getDate();
          let h = date.getHours()<10?('0'+date.getHours()):date.getHours();
          let minute = date.getMinutes();
          minute = minute<10?('0'+minute):minute;
          let second = date.getSeconds();
          second = second<10?('0'+second):second;

          return yy+'-'+mm+'-'+dd
        }
      },
      methods:{
        change(val){
          let that=this
          that.listLoading=true
          that.loadstr="加载中..."

          that.postData.list=[]
          //获取我的订单列表
          this.$api.axiosPost('/reserve/getlist',1,{
            data:{

            },
            page:{
              pageNum:val,
              pageSize:10
            }
          },function (res) {
            let data = res.data.data;
            that.listLoading=false
            that.postData = data;
            if(that.postData.list.length<=0){
              that.loadstr="还没有您的预约"
            }
          })
        },
        desc(id){
          this.$router.push({path:'/indexWrap/shareProject',query:{productId:id}})
        },
        updateStatu(index){
          let that=this
          this.$api.axiosPost('/reserve/updateStatu',1,{
            data:{
              id:that.postData.list[index].id
            },
            page:{
              pageNum:1,
              pageSize:10
            }
          },function (res) {

            that.postData.list[index].status=1
          })

        }
      },
      mounted(){
        const that = this;
        // const userId = parseInt(this.$store.state.login.userId)
        this.change(1)

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myIndent";

.el-header, .el-footer {
  background-color: #ececec;
  color: #333;
  line-height: 60px;
}
.el-container{
  font-size: 16px;
  border:1px solid #ececec;
  width: 80% !important;
  margin-bottom: 10px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.headerImg{
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  float: left;
  margin-top: 9px;
  margin-right: 10px;
}
.username{
  float: left;
}
.headerImg img{height: 100%}
  .shopIcon{float: left;margin-top: 17px;margin-right: 10px;}
  .shopName{float: left;}
  .pro_img{
    width: 200px;
    overflow: hidden;
  }
.prodesc{
  text-align: left;
  padding-left: 20px;

}
.pro_img img{
  width: 100%;
}
  .prodesc div{line-height: 50px !important;}
.prodesc .el-tag{
  margin-right: 10px;
}
  .statusbuton{
    padding: 2px 7px ;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
  }
  .status0{
    background-color: #a61e32;
  }
  .status1{
    background-color: #fdc405;
  }
  .nickname{
    width: 142px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
