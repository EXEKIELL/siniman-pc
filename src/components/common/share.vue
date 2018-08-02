<template>
  <!--二维码组件-->
  <el-dialog title="扫码分享" custom-class="qart" :visible.sync="dialogFormVisible2" @close="diaclose2">
    <div v-if="shows" id="qrcode" ref="qrcode"></div>
    <p v-if="username" style="height: 15px;line-height: 20px;margin-top: 24px;font-size: 15px">
      你正在分享的是
      <span style="color: blue;cursor:pointer;" @click="golist()">{{ username }}</span>
      设计师的方案</p>
  </el-dialog>
</template>
<script>
  import QRCode from 'qrcodejs2'
  export default{

    props:["username","url","downloadButton"],
    data(){
      return{
        config: {
          value: "",
          filter: 'color',
          imagePath:'./static/img/logo01.png',
          version:1,
        },
        shows:false,
        dialogFormVisible2:true
      }
    },
    watch:{
      url:function (val) {

        this.shows=true
        this.$nextTick (function () {
          this.qrcode();
        })
      }
    },
    mounted(){

      this.shows=true
      this.$nextTick (function () {
        this.qrcode();
      })
    },
    methods:{
      diaclose2(){
        this.shows=false
        this.$emit("diaclose")
      },
      qrcode(){
        let qrcode = new QRCode('qrcode', {
          width: 200,  // 设置宽度
          height: 200, // 设置高度
          text: this.url
        })
      },
      golist(){
        let routeData=this.$router.resolve({path:'/indexWrap/shareCommunity',query:{username:this.username}})
        window.open(routeData.href);
      },
    }
  }
</script>
<style>
  .qart{
    width: 300px !important;
    min-height: 350px !important;
  }
  #qrcode{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

