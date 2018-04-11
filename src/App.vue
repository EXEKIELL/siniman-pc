<template>
  <div id="app" class="clearFix">
    <div class="left">
      <div class="logo">
        <img src="./assets/img/logo.png" alt="">
      </div>
      <div class="tab-list">
        <div class="list1">
          <div class="list1-top" @click="handleChange">
            <router-link to="#">
              <span class="left-jiantou"></span><span>个人中心</span>
            </router-link>
          </div>
          <div class="list1-shou" >
            <div v-for="(item,index) in navTabs" :key="item.key" v-if="show">
              <router-link to="#">
                <span></span><span>{{item.text}}</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list1-top" @click="handleChange">
            <router-link to="#">
              <span class="left-jiantou"></span><span>个人中心</span>
            </router-link>
          </div>
          <div class="list1-shou" >
            <div v-for="(item,index) in navTabs" :key="index" v-if="show" :id="item.key">
              <router-link to="#" >
                <span></span><span>{{item.text}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      navTabs: [
        {text:"我的门店",id:"d0"},
        {text:"我的方案",id:"d1"},
        {text:"个人资料",id:"d2"},
        {text:"积分明细",id:"d3"}
      ],
      show:false
    }
  },
  methods:{
    handleChange(){
      console.log(this.$data.show)
      this.$data.show = !this.$data.show
      if(this.$data.show){
        $('.list1-shou').css({
          "transform":"scaleY(1)"
        })
        $('.left-jiantou').css({
          "transform":"rotateZ(90deg)"
        })
      }else{
        $('.list1-shou').css({
          "transform":"scaleY(0)"
        })
        $('.left-jiantou').css({
          "transform":"rotateZ(0deg)"
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.clearFix::after{
  content: '';
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.clearFix{
  zoom: 1;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  >div{
    float: left;
  }
  .left{
    width: 12%;
    background-color: #333333;
    .logo{
      width: 100%;
      img{
        width: 50%;
        margin: auto;
      }
    }
    .tab-list{
      .list1{
        .list1-top{
          >a{
            padding: 20px 0;
            display: block;
            font-size: 14px;
            color: #ecf1f5;
            span{
              display: inline-block;
              vertical-align: middle;
            }
            >span:first-child{
              width: 15px;
              height: 15px;
              background: url("assets/img/icon01.png") no-repeat;
              background-position: 5px 2px;
              margin-right: 5px;
              transition: 0.4s;
            }
          }
        }
        .list1-shou{
          background-color: #444444;
          transition: 0.5s;
          transform-origin: top left;
          transform: scaleY(0);
          >div{
            a{
              padding: 20px 0 20px 30px;
              display: block;
              font-size: 14px;
              color: #ecf1f5;
              span{
                display: inline-block;
                vertical-align: middle;
              }
              >span:first-child{
                width: 25px;
                height: 25px;
                background: url("assets/img/icon02.png") no-repeat;
                background-position: 0 5px;
              }
            }
          }
          >div:nth-child(2){
            a{
              >span:first-child{
                background: url("assets/img/icon03.png") no-repeat;
                background-position: 0 5px;
              }
            }
          }
          >div:nth-child(3){
            a{
              >span:first-child{
                background: url("assets/img/icon04.png") no-repeat;
                background-position: 0 5px;
              }
            }
          }
          >div:nth-child(4){
            a{
              >span:first-child{
                background: url("assets/img/icon05.png") no-repeat;
                background-position: 0 5px;
              }
            }
          }
        }
      }
    }
  }
  .right{
    width: 88%;
  }
}
</style>
