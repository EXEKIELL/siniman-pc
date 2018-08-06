<template>
  <div id="myProjectIndex">
    <div class="wrap3">
      <div class="w3-title">
        <span>未通过的方案</span>
      </div>

      <div class="w3-cont" style="margin-top: 20px">

        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

          <el-table-column label="ID"  width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="方案名称"  show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="javascript:;" @click="toUrl(scope.row.id)">{{ scope.row.productname }}</a>
            </template>
          </el-table-column>
          <el-table-column label="渲染图"  show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.renders.length }}张
            </template>
          </el-table-column>

          <el-table-column label="退回原因"  show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.statusdes }}
            </template>
          </el-table-column>
          <el-table-column label="退回次数"  show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.passNum==0?1:scope.row.passNum }}
            </template>
          </el-table-column>

          <el-table-column label="上传时间"  show-overflow-tooltip>
            <template slot-scope="scope">
              {{ getTime(scope.row.createtime) }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            width="230">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="toUrl(scope.row.id)">查看</el-button>
              <el-button type="text" size="small"  @click="cxtj(scope.row.id)">重新提交</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagina" style="margin-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'myPass',
    data(){
      return{
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
        },
      }
    },

    mounted(){
      this.getlist()
    },
    methods:{
      getTime(titme){
        return this.$api.formatDate(new Date(titme),'yyyy-MM-dd hh:mm:ss')
      },
      getlist(){
        let that=this
        that.lodingstr="加载中..."
        that.listLoading=true
        that.list=[]
        that.$api.axiosPost('/product/mypass',1,{
          data:{
            prostatus:-1,
            orderByCondition:'DESC',
            orderByField:'id',
          },
          page:{
            pageNum:that.listQuery.page,
            pageSize:that.listQuery.limit,
          }
        },function (res) {
          let data = res.data.data;
          that.list=data.list
          that.total=(data.last_page)*10
          that.listLoading=false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      toUrl(val){
        let routeData=this.$router.resolve({path:'/indexWrap/myProject',query:{productId:val}})
        window.open(routeData.href, '_blank');
      },
      cxtj(id){
        let that=this
        this.$confirm('是否提交审核?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          that.$api.axiosPost('/product/updateStatus',1,{proid:id},function (res) {
            that.$message.success('提交成功');
          })
        }).catch(()=>{})
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../static/sass/myProjectIndex";
  .list1{
    cursor:pointer;
  }
</style>
<style lang="scss" scoped>
  @import "../../static/sass/public";
</style>
