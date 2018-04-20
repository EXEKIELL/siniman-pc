<template>
    <div id="myProjectIndex">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的方案</span>
        </div>
        <div class="w3-nav">
          <ul>
            <li class="clearFix">
              <span class="nav-left">类型：</span>
              <div class="nav-right">
                <div v-for="(item,index) in leixing" :key="index">
                  <div @click="navSel">{{item.text}}</div>
                </div>
              </div>
            </li>
            <li class="clearFix">
              <span class="nav-left">阶段：</span>
              <div class="nav-right">
                <div v-for="(item,index) in jieduan" :key="index">
                  <div @click="navSel">{{item.text}}</div>
                </div>
              </div>
            </li>
            <li class="clearFix">
              <span class="nav-left">户型：</span>
              <div class="nav-right">
                <div v-for="(item,index) in huxing" :key="index">
                  <div @click="navSel">{{item.text}}</div>
                </div>
              </div>
            </li>
            <li class="clearFix">
              <span class="nav-left">风格：</span>
              <div class="nav-right">
                <div v-for="(item,index) in fengge" :key="index">
                  <div @click="navSel">{{item.text}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-cont">
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img05.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
          </div>
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img06.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
          </div>
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img07.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
          </div>
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img02.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
          </div>
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img03.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
          </div>
          <div class="list1">
            <div class="list1-img">
              <img src="../../static/img/img04.png" alt="">
              <div>
                <button>分享家·赢豪礼</button>
                <button>编辑方案</button>
              </div>
              <div>
                <div>
                  <img src="../../static/img/img_sm01.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm02.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm03.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
                <div>
                  <img src="../../static/img/img_sm04.png" alt="">
                  <div class="maskSm">
                    <button>设为封面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>张若昀 </span>
                </div>
                <div>
                  <span></span><span>15205201520</span>
                </div>
                <div>
                  <span></span><span>天河区科韵路方圆E时光西座2202</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
            </div>
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
      name: "MyProjectIndex",
      data(){
        return {
          leixing:[
            {text:"全部"},
            {text:"全屋方案"},
            {text:"空间方案"}
          ],
          jieduan:[
            {text:"全部"},
            {text:"户型阶段"},
            {text:"装修阶段"}
          ],
          huxing:[
            {text:"全部"},
            {text:"一室一厅"},
            {text:"两室一厅"},
            {text:"两室二厅"},
            {text:"三室一厅"},
            {text:"三室二厅"},
            {text:"四室一厅"},
            {text:"四室两厅"},
            {text:"其他"}
          ],
          fengge:[
            {text:"全部"},
            {text:"北欧"},
            {text:"简欧"},
            {text:"现代简约"},
            {text:"新中式"},
            {text:"其他"}
          ],
        }
      },
      methods:{
        navSel(){
          var e = event.target;
          $(e).addClass("sel");
          $(e).parent('div').siblings('div').find('div').removeClass('sel')
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myProjectIndex";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
