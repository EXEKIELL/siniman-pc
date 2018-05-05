<template>
    <div id="myData">
      <div class="wrap">
        <div class="list1">
          <div>
            <div>
              <div>
                <img :src="userdata.img==''?headimg:userdata.img" alt="">
              </div>
            </div>
            <div>
              <div>
                <span>{{userdata.username}}</span>
                <span>{{roles.roles[0].name}}</span>
                <div @mouseover="onshow" @mouseout="onhide">
                  <div class="idendity">
                    <ul>
                      <li v-for="(item,index) in roles.roles" :key="index">{{item.name}}</li>
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
              <div><span></span><span>门店：</span><span>诗尼曼家居番禺万博体验店</span></div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <span>获赞</span><span>153</span>
              </div>
              <div>
                <span>作品</span><span>236</span>
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
              <div>点击进入>></div>
            </div>
          </div>
          <div>
            <div>
              <img src="../../static/img/icon54.png" alt="">
            </div>
            <div>
              <div>消息管理</div>
              <div>点击进入>></div>
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
          userdata:JSON.parse(localStorage.getItem('user-info')).data,
          roles:JSON.parse(JSON.parse(localStorage.getItem('user-info')).data.roles)
        }
      },
      methods:{
        onshow(){
          $('.idendity').show()
        },
        onhide(){
          $('.idendity').hide()
        },
        toUrl(){
          this.$router.push('/indexWrap/integralDetail')
        }
      },
      mounted(){
        console.log(this.userdata)
        console.log(this.roles)
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myData";
</style>
