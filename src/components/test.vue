<template>
    <div id="test">
      <button @click="dianwo">点点点</button>
    </div>
</template>

<script>
  import api from '../api/index'
    export default {
      name: "Test",
      methods:{
        dianwo(){
          api.axiosGet('/person/userInfo',{
            userId:"109740"
          },function (res) {
            console.log(res)
          })
          api.axiosPost('/product/add',{

          })
        }
      }
    }
</script>

<style scoped>

</style>
