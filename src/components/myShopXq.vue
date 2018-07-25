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
              <el-upload
                :limit="filelimit"
                :action="uploadUrl"
                name="file"
                :data="uploadData"
                :auto-upload="true"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-exceed="fileexceed"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadSuccess"
                :file-list="file_list"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" v-for="item in dialogImageUrl" :src="item.url" alt="">
              </el-dialog>
            </div>
            <div>
              <div>
                <span>门店名称：</span>
                <input type="text" v-model="detailData.shopname" >
              </div>
              <div>
                <span>联系方式：</span>
                <input type="text" v-model="detailData.shopcontact">
              </div>
              <div>
                <span>联系人：</span>
                <input type="text" v-model="detailData.contacts">
              </div>

            </div>

            <div>
              <div>
                <span>地区：</span>
                <el-select v-model="ids[0]" @change="selPro" popper-class="abc" >
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
                <el-select v-model="ids[1]" @change="selCity" popper-class="abc" >
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
                <el-select v-model="ids[2]"  popper-class="abc" >
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
                <input type="text" v-model="detailData.detailaddress">
              </div>
            </div>
            <div>
              <button  @click="xiugai">修改</button>
              <button  style="background: none" @click="fanhui">返回</button>
            </div>
          </div>
        </div>
        <div class="list2" style="display: none">
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
  import {Message,MessageBox} from "element-ui"
    export default {
      name: "MyShopXq",
      data(){
        return {
          filelimit:3,
          dialogImageUrl: "",
          dialogVisible: false,
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
          regionId:null,
          uploadData:{
            authorization:''
          },
          uploadUrl:'',
          file_list:[]
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

        },
        delete_img(item){
          this.imgs.splice(item,1);
        },
        handleRemove(file, fileList) {
          let obj=file.response.data.obj
          this.$api.axiosPost('/shop/deletImg',1,{
            obj:obj
          },function (res) {

          })
          let objs=[]
          for(let i=0;i<fileList.length;i++){
            let obj=fileList[i].response.data
            objs.push(obj)

          }
          this.imgs=objs
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;

        },
        xiugai(){

          this.inputShow = true
          const that = this
          let id = this.$router.history.current.query.shopId;

          this.$api.axiosPost('/shop/updateShop',1,{
            id:id,
            shopname:this.detailData.shopname,
            province:this.ids[0],
            city:this.ids[1],
            region:this.ids[2],
            detailaddress:this.detailData.detailaddress,
            shopcontact:this.detailData.shopcontact,
            contacts:this.detailData.contacts,
            coverphoto:JSON.stringify(this.imgs)
          },function (res) {

          })

        },
        fanhui(){
          this.$router.back(-1)
        },
        beforeAvatarUpload(file){
          let isJPG = file.type === 'image/jpg';
          let isPNG = file.type === 'image/png';
          let isJPEG= file.type === 'image/jpeg';
          let isLt2M = file.size / 1024 / 1024 < 2;


          if (file.type!="image/jpg" && file.type!="image/png" && file.type!="image/jpeg") {
            Message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!')
            return false
          }
          if (!isLt2M) {
            Message.error('上传头像图片大小不能超过 2MB!')
            return false
          }
          return true
        },
        fileexceed(){
          Message.warning("最多只能上传3张banner图")
        },
        uploadSuccess(response, file, fileList){
            if(response.status!=200){
              Message.warning("上传失败")
            }
          let objs=[]
          for(let i=0;i<fileList.length;i++){
            let obj=fileList[i].response.data
            objs.push(obj)

          }

          this.imgs=objs

        },
        selPro(val){

          //选择省查询子集
          const that = this;
          this.$api.axiosPost('/area/getByParentId',1,{
            parentId:val
          },function (res) {
            that.selectList1 = res.data.data
            that.ids[1] =""
            that.ids[2] =""
          })
        },
        selCity(val){
          //选择省查询子集
          const that = this;
          this.$api.axiosPost('/area/getByParentId',1,{
            parentId:val
          },function (res) {
            that.selectList2 = res.data.data
            that.ids[2] =""
          })
        },
      },
      mounted(){
        let shopId = this.$router.history.current.query.shopId;

        let that = this;

        let header={}
        let access_token=that.$api.getToken()

        if(access_token){
          let Base64 = require('js-base64').Base64
          header.access_token=access_token
          let json=JSON.stringify(header)
          let baseJson=Base64.encode(json)
          that.uploadData.authorization='Basic '+baseJson
        }
        /**获取rooturl,并设置上传url**/
        let baseUrl=that.$api.baseUrl
        that.uploadUrl=baseUrl+'shop/upload'
        //获取地区列表
        this.$api.axiosPost('/area/getByParentId',1,{
          parentId:''
        },function (res) {
          that.selectList = res.data.data
        })
        //获取门店详情
        this.$api.axiosPost('/shop/shopDetail',1,{
          shopId:shopId
        },function (res) {

          that.detailData = res.data.data
          that.ids = [parseInt(res.data.data.province),parseInt(res.data.data.city),parseInt(res.data.data.region)]

          that.file_list=JSON.parse(that.detailData.coverphoto)
          //获取地区
          that.$api.axiosPost('/area/getByParentId',1,{
            parentId:that.ids[0]
          },function (res1) {
            that.selectList1 = res1.data.data

            //获取区
            that.$api.axiosPost('/area/getByParentId',1,{
              parentId:that.ids[1]
            },function (res2) {
              that.selectList2 = res2.data.data
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
              let marker = new qq.maps.Marker({
                map:map,
                position: result.detail.location
              });
              $("#locate").attr('value',result.detail.location);

            }
          });
          qq.maps.event.addListener(
            map,
            'click',
            function(event) {
              let lng=event.latLng.getLng();
              let lat=event.latLng.getLat();
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
