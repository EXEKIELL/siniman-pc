<template>
  <div id="myReport">
    <div class="wrap3">
      <div class="w3-title">
        <span>我的报表</span>
      </div>
      <div class="w3-cont">
        <div class="list2">
          <div class="nav">
            <ul>
              <li><span :class="{sel:sel==1}" @click="change(1)">客户状态分析</span></li>
              <li><span :class="{sel:sel==2}" @click="change(2)">客户转化率分析</span></li>
            </ul>
          </div>
          <div v-if="sel==1">
              <div class="echarts" id="echarts1"></div>
              <div class="echarts" id="echarts2"></div>
          </div>
          <div v-if="sel==2">
            <div class="echarts" id="echarts3"></div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: "MyReport",
    data(){
      return{
        getList:[],
        sel:1,
        echarts1Data:[],
        echarts2Data:[],
        echarts3Data:[]
      }
    },
    methods:{
      change(val){
        this.sel=val
        let that=this
        if(val==1){
          that.$api.axiosPost('/userinfo/getClientStatusAnalysis',1,{},function (res) {
            let data=res.data.data
            that.echarts1Data=[
              {value:data.hasCheckedClientCount,name:'接触客户'},
              {value:data.hasSendedClientCount,name:'派尺客户'},
              {value:data.hasMeasuredClientCount,name:'量尺客户'},
              {value:data.hasSchemeClientCount,name:'方案客户'},
              {value:data.hasCheckedClientCount,name:'确图客户'},
              {value:data.hasOrderClientCount,name:'下单客户'}
            ]
            for (let item in data){
              that.echarts2Data.push(data[item])
            }
            that.setOption()
          })
        }else if(val==2){
          that.$api.axiosPost('/userinfo/getClientConvertRateAnalysis',1,{},function (res) {
            let data=res.data.data
            that.echarts3Data=[
              data.allMeasureInTouchRate,
              data.allCheckMeasureDealRate,
              data.allSchemeDealRate,
            ]

            that.setOption2()
          })
        }
      },
      setOption:function(){
        let self=this
        let myChart = echarts.init(document.getElementById('echarts1'));

        // 指定图表的配置项和数据
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            }
          },
          toolbox: {
            show : true,
            feature : {
              saveAsImage : {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          title: {
            text: '饼形图统计'
          },
          series: [{
            name: '销量',
            type: 'pie',
            radius : '55%' //饼图的半径大小
            ,data: self.echarts1Data,
            label : {
              normal : {
                formatter: '{b}:{c}: ({d}%)',
                textStyle : {
                  fontWeight : 'normal',
                  fontSize : 15
                }
              }
            }
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        let myChart2 = echarts.init(document.getElementById('echarts2'));
        let option2 = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {
              type : 'shadow'
            }
          },
          toolbox: {
            show : true,
            feature : {
              saveAsImage : {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          title: {
            text: '柱形图统计'
          },
          xAxis : [
            {
              type : 'category',
              data : ["接触客户","派尺客户","量尺客户","方案客户","确图客户","下单客户",'完成客户']

            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series: [{
            name: '销量',
            type: 'bar',
            data: self.echarts2Data,
            label:{
              normal:{
                show: true,
                position: 'top'}
              },
          }]
        };
        myChart2.setOption(option2);
      },
      setOption2:function(){
        let self=this
        let myChart2 = echarts.init(document.getElementById('echarts3'));
        let option2 = {
          title: {
            text: '转化率统计分析'
          },
          legend: {
            data:['百分比']
          },
          xAxis : [
            {
              type : 'category',
              data : ["进店量尺率","方案进店率",'方案成交率']

            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series: [
            {
              name: '未选择',
              type: 'bar',
              data: self.echarts3Data,
              label:{
                normal:{
                  show: true,
                  position: 'top'
                }
              },
            }
          ]
        };
        myChart2.setOption(option2);
      }
    },
    mounted(){
      this.change(1)
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../static/sass/myReport";
  .echarts{
    width: 800px;
    height: 600px;
    background-color: #fff;
    margin-top: 20px;
  }
</style>
