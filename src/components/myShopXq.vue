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
                <input type="text">
              </div>
              <div>
                <span>联系方式：</span>
                <input type="text">
              </div>
              <div>
                <span>门店地址：</span>
                <input type="text">
              </div>
              <div></div>
            </div>
            <div>
              <div>
                <span>地区：</span>
                <div>
                  <select v-model='type1' name="province" id="province">
                    <option v-for="item in selectList" :value=item.value selected>{{item.text}}</option>
                  </select>
                  <span>{{type1}}</span>
                </div>
                <div>
                  <select name="city" id="city" v-model='type2'>
                    <option v-for="item in selectList1" :value=item.value selected>{{item.text}}</option>
                  </select>
                  <span>{{type2}}</span>
                </div>
                <div>
                  <select name="district" id="district" v-model='type3' >
                    <option v-for="item in selectList2" :value=item.value selected>{{item.text}}</option>
                  </select>
                  <span>{{type3}}</span>
                </div>
              </div>
              <div>
                <span>详细地址：</span>
                <input type="text">
              </div>
            </div>
            <div>
              <button>保存</button>
              <button>修改</button>
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
          type1:'广东省',
          type2:'广州市',
          type3:'海珠区',
          imgs:[],
          selectList:[
            {text:"广东省",value:"广东省"},
            {text:"广东省1",value:"广东省1"}
          ],
          selectList1:[
            {text:"广州市",value:"广州市"},
            {text:"广州市1",value:"广州市1"}
          ],
          selectList2:[
            {text:"海珠区",value:"海珠区"},
            {text:"海珠区1",value:"海珠区1"}
          ],
          province:'',
          city:'',
          district:'',
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
        }
      },
      mounted(){
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
