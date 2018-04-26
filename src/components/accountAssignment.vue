<template>
    <div id="accountAssignment">
      <div class="wrap">
        <div class="list1">
          <div class="l1-1">
            <button>
              <span></span><span>批量删除</span>
            </button>
            <button>
              <span></span><span>添加</span>
            </button>
          </div>
          <div class="l1-2">
            <div>
              <select name="username" id="username">
                <option value="user">用户名1</option>
                <option value="user">用户名2</option>
                <option value="user">用户名3</option>
              </select>
              <button @click="la">
                <img src="../../static/img/icon57.png" alt="">
              </button>
            </div>
            <div>
              <input type="text" placeholder="请输入搜索内容">
              <button>搜索</button>
            </div>
          </div>
        </div>
        <div class="list2">
          <ul>
            <li>
              <div>
                <div class="checkBox">
                  <input type="checkbox" @click.stop="selAll" name="name1">
                  <span class="seled" @click.stop="clAll"></span>
                </div>
              </div>
              <div><span>用户名称</span></div>
              <div><span>所属角色</span></div>
              <div><span>姓名</span></div>
              <div><span>联系方式</span></div>
              <div><span>登录次数</span></div>
              <div><span>创建时间</span></div>
              <div><span>操作</span></div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
            <li class="contList">
              <div>
                <div class="checkBox">
                  <input class="seleBox" type="checkbox" @click.stop="xuanzhong(1)" name="name1">
                  <span class="seled" @click.stop="qxXuanzhong(1)">
                  </span>
                </div>
              </div>
              <div><span>admin</span></div>
              <div><span>超级管理员</span></div>
              <div><span>李冰和</span></div>
              <div><div><span>邮箱：804657038@qq.com</span><span>手机：18520329226</span></div></div>
              <div><span>42</span></div>
              <div><span>2017-11-15</span></div>
              <div>
                <div>
                  <button>
                    <span></span><span>编辑</span>
                  </button>
                  <button>
                    <span></span><span>删除</span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
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
    </div>
</template>

<script>
    export default {
      name: "AccountAssignment",
      methods:{
        selAll(){
          var e =event.target
          $('.contList .seled').show()
          $(e).siblings('span').show()
          $('.seleBox').attr({
            checked:"checked"
          })
        },
        clAll(){
          var e = event.target
          $(e).hide()
          $('.contList .seled').hide()
          $('.seleBox').removeAttr("checked")
        },
        xuanzhong(index){
          var e = event.target
          $(e).attr({
            checked:"checked"
          })
          $(e).siblings('span').show();
        },
        qxXuanzhong(index){
          var e = event.target
          $(e).hide()
          $('.seleBox').removeAttr("checked")
        },
        la(){
          console.log(1)
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/accountAssignment";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
