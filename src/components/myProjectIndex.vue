<template>
    <div id="myProjectIndex">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的方案</span>
        </div>
        <div class="w3-nav">
          <ul>
            <li class="clearFix" v-for="(item,index) in tagsList" :key="index">
              <span class="nav-left">{{item.cat_name+'：'}}</span>
              <div class="nav-right">
                <div>
                  <div @click="navSel('全部',index)" class="sel" >全部</div>
                </div>
                <div v-for="(item1,index1) in item.taglist" :key="index1">
                  <div @click="navSel(index,index1)" >{{item1.tagname}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-cont">
          <div class="list1" v-for="(item,index) in productList.data" :key="index" @click="toUrl(item.id)">
            <div class="list1-img">
              <img :src="item.desid[0].img" alt="">
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span><span>{{item.area}}m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>{{item.customername}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customercontact}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customeraddr}}</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span v-for="(item,index) in item.tags" :key="index" v-if="index<4">{{item.tagname}}</span>
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
          @current-change="change"
          :total="productList.last_page*10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyProjectIndex",
      data(){
        return {
          tagsList:[],
          productList:{},
          tags:[],
          postTags:[],
          orderByField:''
        }
      },
      methods:{
        navSel(val,val1){
          const that = this;
          var e = event.target;
          $(e).addClass("sel");
          $(e).parent('div').siblings('div').find('div').removeClass('sel');
          //  标签筛选
          if(val != '全部'){
            this.tags[val+''] = val1
          }else{
            delete this.tags[val1+'']
          }
          console.log(this.tags);
          let tags1 = [];
          this.postTags = [];
          for (var key in this.tags) {
            var index = key,
              index1 = this.tags[key]
            this.postTags.push(this.tagsList[index].taglist[index1].catalogcode)
          }
          console.log(that.postTags)
          //获取方案列表
          this.$ajax.axiosPost('/pro/prolists',3,{
            page:val,
            tag:that.postTags,
            pages:1
          },function (res) {
            console.log('方案列表',res);
            let data = res.data.data;
            that.productList = data;
            console.log(that.productList);
          })
        },
        toUrl(val){
          this.$router.push({path:'/indexWrap/myProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          //获取方案列表
          this.$ajax.axiosPost('/pro/prolists',3,{
            page:val,
            tag:that.postTags,
            pages:1
          },function (res) {
            console.log('方案列表',res);
            let data = res.data.data;
            that.productList = data;
            console.log(that.productList);
          })
        }
      },
      mounted(){
        const that = this;
        //标签获取
        this.$ajax.axiosGet('/tag/tagcatlist',3,{},function (res) {
          console.log(res);
          let data = res.data.data;
          that.tagsList = data;
        })
        //获取方案列表
        this.$ajax.axiosPost('/pro/prolists',3,{
          page:1,
          tag:that.postTags,
          pages:1
        },function (res) {
          console.log('方案列表',res);
          let data = res.data.data;
          that.productList = data;
          console.log(that.productList);
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myProjectIndex";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
