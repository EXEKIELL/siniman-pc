<template>
    <div id="messageManage">
      <div class="bj">
        <div class="wrap">
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon30.png" alt="">
              </div>
              <div>
                <div><span>系统消息</span><span>3</span></div>
                <div><span @click="navTo">查看系统消息>></span></div>
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon31.png" alt="">
              </div>
              <div>
                <div><span>订单消息</span><span>2</span></div>
                <div><span>查看系统消息>></span></div>
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon32.png" alt="">
              </div>
              <div>
                <div><span>客户跟进</span><span>3</span></div>
                <div><span>查看系统消息>></span></div>
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon33.png" alt="">
              </div>
              <div>
                <div><span>预约设计</span><span>8</span></div>
                <div><span>查看系统消息>></span></div>
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon34.png" alt="">
              </div>
              <div>
                <div><span>积分消息</span><span>6</span></div>
                <div><span>查看系统消息>></span></div>
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <div>
                <img src="../../static/img/icon35.png" alt="">
              </div>
              <div>
                <div><span>活动消息</span><span>2</span></div>
                <div><span>查看系统消息>></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MessageManage",
      methods:{
        navTo(){
          this.$router.push("/messageXq")
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/messageManage";
</style>
