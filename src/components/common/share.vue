<template>
  <!--二维码组件-->
  <el-dialog title="扫码分享" custom-class="qart" :visible.sync="dialogFormVisible" @close="diaclose">
    <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
    <p v-if="username" style="height: 15px;line-height: 15px">你正在分享的是{{ username }}设计师的方案</p>
  </el-dialog>
</template>
<script>
  import VueQArt from 'vue-qart'
  export default{
    components:{
      VueQArt
    },
    props:["username","url","dialogFormVisible","downloadButton"],
    data(){
      return{
        config: {
          value: "",
          filter: 'color',
          imagePath:'./static/img/logo01.png',
          version:1,
        },
      }
    },
    watch:{
      url:function (val) {
        this.config.value=val
      }
    },
    methods:{
      diaclose(){}
    }
  }
</script>
