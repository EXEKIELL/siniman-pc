<template>
    <div id="login">
      <div class="wrap">
        <h1>登录</h1>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="form.username"></el-input>
            <span class="name"></span>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="form.pswd"></el-input>
            <span class="pw"></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sub">提交</el-button>
            <el-button @click="reset1">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          form: {
            username: '',
            pswd:''
          }
        }
      },
      methods:{
        sub(){
          if(this.$data.form.username == ''){
            $('.name').text("用户名不能为空")
          }else if(this.$data.form.pswd == ''){
            $('.pw').text("密码不能为空")
          }else{
            $('.name').text("")
            $('.pw').text("")
            this.$http({
              url: 'http://118.24.62.151:8080/snimay_sharing/user/checkLogin',
              method: 'POST',
              data:this.$data.form,
              headers: {
                'Content-Type': 'x-www-from-urlencoded'
              }
            }).then(function (res) {
              console.log(res)
            }, function () {
              console.log("请求失败")
            });
          }
        },
        reset1(){
          this.$data.form.username = "";
          this.$data.form.pswd = "";
        }
      },
      mounted(){

      }
    }
</script>

<style lang="scss" scoped>
#login{
  position: absolute;
  right: 50%;
  top: 50%;
  margin-top: -2.5%;
  h1{
    margin-bottom: 20px;
  }
  .name,.pw{
    color: #ff0000;
  }
}
</style>
