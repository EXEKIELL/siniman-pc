<template>
  <div id="projectComment">
    <div class="wrap">
      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head02.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span></span><span>钱晓慧</span></div>
          </div>
          <div class="huifu">
            <p>装修的特别好看，我特别喜欢的北欧风，非常喜欢了。态度非常好，我要把它推荐给我朋友。</p>
          </div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>

      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head02.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span></span><span>钱晓慧</span></div>
          </div>
          <div class="huifu">
            <p>装修的特别好看，我特别喜欢的北欧风，非常喜欢了。态度非常好，我要把它推荐给我朋友。</p>
            <div class="huifu1">
              <div class="huifuList">
                <div><span>邱梓啊：</span><span>您好，可以的，直接返回上一个页面输入您的联系方式，到时候跟您好时间上门量房</span></div>
                <div><span>2018-04-03</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>


    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="40">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProjectComment"
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/projectComment";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
