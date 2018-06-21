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
                <span v-for="(item,index) in roles" :key="index" v-if="index==0">{{item.name}}</span>
                <div @mouseover="onshow" @mouseout="onhide">
                  <div class="idendity">
                    <ul>
                      <li v-for="(item,index) in roles" :key="index">{{item.name}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div><span></span><span>{{userdata.phone}}</span></div>
            </div>
          </div>
          <div>
            <div>
              <div><span></span><span>账号：</span><span>{{userdata.account}}</span></div>
              <div><span></span><span>门店：</span><span>{{shopName}}</span></div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <span>获赞</span><span>{{userdata.goodcount==null?0:userdata.goodcount}}</span>
              </div>
              <div>
                <span>作品</span><span>{{userdata.productCount==null?0:userdata.productCount}}</span>
              </div>
              <div>
                <span>预约</span><span>{{userdata.bespeakcount==null?0:userdata.bespeakcount}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="list2">
          <div>
            <div>
              <img src="../../static/img/icon34.png" alt="">
            </div>
            <div>
              <div>积分明细</div>
              <div @click="toUrl">点击进入>></div>
            </div>
          </div>
          <div>
            <div>
              <img src="../../static/img/icon53.png" alt="">
            </div>
            <div>
              <div>设计方案</div>
              <div @click="toUrl">点击进入>></div>
            </div>
          </div>
          <div>
            <div>
              <img src="../../static/img/icon54.png" alt="">
            </div>
            <div>
              <div>消息管理</div>
              <div @click="toUrl">点击进入>></div>
            </div>
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
          headimg:'../../static/img/head05.png',
          userdata:'',//JSON.parse(localStorage.getItem('user-info')).data,
          roles:'',//JSON.parse(JSON.parse(localStorage.getItem('user-info')).data.roles),
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
        toUrl(event){
          var text = $(event.target).siblings('div').text();
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
        // let shopId = this.userdata.shops.split(",");
        // console.log(shopId)
        // this.$api.axiosGet('/shop/shopDetail'+that.$store.state.login.str1,{
        //   shopId:shopId[0]
        // },function (res) {
        //   console.log(res)
        //   that.shopName = res.data.data.shopname
        // })
        that.userdata = JSON.parse(localStorage.getItem('user-info'));
        console.log(that.userData);
        that.roles = JSON.parse(localStorage.getItem('user-info')).roles;
        console.log(that.roles);
        this.$ajax.axiosPost('/user/stores',3,{},function (res) {
          console.log(res);
          that.shopName = res.data.data[0].shopname;
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myData";
</style>
