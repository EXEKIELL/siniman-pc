<template>
    <div id="myShopXq">
      <div class="wrap">
        <div class="list1">
          <div class="l1-title">
            <span>修改资料</span>
          </div>
          <div class="l1-cont">
            <div>
              <span>门店图片：</span>
              <ul class="clearFix">
                <li v-for='(item ,index ) in imgs'>
                  <img :src="item" alt="" />
                  <span @click='delete_img(index)'></span>
                </li>
              </ul>
              <div>
                <div>
                  <input type="file" @change='add_img'>
                  <span></span><span></span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span>门店名称：</span>
                <input type="text" v-model="detailData.shopname" :disabled="inputShow">
              </div>
              <div>
                <span>联系方式：</span>
                <input type="text" v-model="detailData.shopcontact" :disabled="inputShow">
              </div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div>
                <span>地区：</span>
                <el-select v-model="value"  popper-class="abc" :disabled="inputShow">
                  <el-option  value="">
                    <span>请选择省</span>
                  </el-option>
                  <el-option
                    v-for="(item,index) in selectList"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="value1"  popper-class="abc" :disabled="inputShow">
                  <el-option  value="">
                    <span>请选择市</span>
                  </el-option>
                  <el-option
                    v-for="(item,index) in selectList1"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="value2"  popper-class="abc" :disabled="inputShow">
                  <el-option  value="">
                    <span>请选择区</span>
                  </el-option>
                  <el-option
                    v-for="(item,index) in selectList2"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>详细地址：</span>
                <input type="text" v-model="detailData.detailaddress" :disabled="inputShow">
              </div>
            </div>
            <div>
              <button v-if="showBtn" @click="xiugai">修改</button>
              <button v-else @click="baocun">保存</button>
            </div>
          </div>
        </div>
        <div class="list2">
          <div class="l2-title">
            <span>门店位置</span>
          </div>
          <div class="l2-cont">
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyShopXq",
      data(){
        return {
          showBtn:true,
          inputShow:true,
          type1:'广东省',
          type2:'广州市',
          type3:'海珠区',
          imgs:[],
          detailData:{},
          value:'',
          value1:'',
          value2:'',
          selectList:[],
          selectList1:[],
          selectList2:[],
          province:'',
          city:'',
          district:'',
          ids:[],
          cityId:null,
          regionId:null
        }
      },
      methods:{
        codeAddress() {
          var province = $("#province").find("option:selected").text();
          var city=$("#city").find("option:selected").text();
          var area=$("#district").find("option:selected").text();
          var addr=$("#addr").val();
          var address = "中国,"+province+","+city+","+area+","+addr;
          //通过getLocation();方法获取位置信息值
          geocoder.getLocation(address);
        },
        add_img(event){
          var reader =new FileReader();
          var img1=event.target.files[0];

          reader.readAsDataURL(img1);
          var that=this;
          reader.onloadend=function(){
            that.imgs.push(reader.result)
          }
        },
        delete_img(item){
          this.imgs.splice(item,1);
        },
        xiugai(){
          this.inputShow = false;
          this.showBtn = false
          console.log(this.imgs)
        },
        baocun(){
          this.inputShow = true
          const that = this
          let id = this.$router.history.current.query.shopId;
          this.$api.axiosPost('/shop/updataShop'+that.$store.state.login.str1,1,{
            id:id,
            shopname:this.detailData.shopname,
            province:this.value,
            city:this.value1,
            region:this.value2,
            detailaddress:this.detailData.detailaddress,
            shopcontact:this.detailData.shopcontact,
            coverphoto:JSON.stringify(this.imgs)
          })
          this.showBtn = true
        }
      },
      mounted(){
        var shopId = this.$router.history.current.query.shopId;
        console.log(shopId)
        const that = this;
        //获取地区列表
        // this.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
        //   parentId:''
        // },function (res) {
        //   that.selectList = res.data
        // })
        //获取门店详情
        this.$api.axiosGet('/shop/shopDetail'+that.$store.state.login.str1,{
          shopId:shopId
        },function (res) {
          console.log(res)
          that.detailData = res.data.data
          that.ids = [parseInt(res.data.data.province),parseInt(res.data.data.city),parseInt(res.data.data.region)]
          //获取地区
          that.$api.axiosPost('/area/getByIds'+that.$store.state.login.str1,1,{
            ids:that.ids
          },function (res) {
            console.log('地区',res)
            that.cityId = res.data[0].id;
            that.region = res.data[1].id;
            that.value = res.data[0].id;
            that.value1 = res.data[1].id;
            that.value2 = res.data[2].id;
            console.log(that.cityId,that.region)
            //获取省
            that.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
              parentId:''
            },function (res) {
              console.log('1',res)
              that.selectList = res.data
              //获取市
              that.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
                parentId:that.cityId
              },function (res) {
                console.log('2',res)
                that.selectList1 = res.data
                //获取区
                that.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
                  parentId:that.region
                },function (res) {
                  console.log('3',res)
                  that.selectList2 = res.data
                })
              })
            })
          })
        })

        var geocoder,map,marker = null;
        var init = function(Lat,Lng) {
          var center = new qq.maps.LatLng(Lat,Lng);//23.134751, 113.339327
          map = new qq.maps.Map(document.getElementById('container'),{
            center: center,
            zoom: 15
          });
          var marker = new qq.maps.Marker({
            position: center,
            map: map
          });
          //调用地址解析类
          geocoder = new qq.maps.Geocoder({
            complete : function(result){
              map.setCenter(result.detail.location);
              var marker = new qq.maps.Marker({
                map:map,
                position: result.detail.location
              });
              $("#locate").attr('value',result.detail.location);
              //console.log(result.detail.location);
            }
          });
          qq.maps.event.addListener(
            map,
            'click',
            function(event) {
              var lng=event.latLng.getLng();
              var lat=event.latLng.getLat();
              $("#locate").attr('value',lat+','+lng);
              init(lat,lng);
            }
          );
        }
        init(23.134751,113.339327);

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myShopXq";
</style>
