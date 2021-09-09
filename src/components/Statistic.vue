<template>
  <div style="margin-left: 30px;margin-right: 30px">
<!--    第一排所展示的数据-->
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="item in 6" :key="item">
<!--        <el-image-->
<!--          :src="require('/Users/anthony/Desktop/data_collect_web/src/assets/pic/statistic_1.jpg')"-->
<!--          :fit="cover"></el-image>-->
      </el-carousel-item>
    </el-carousel>
<!--    第二排数据选择-->
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" style="height: 300px;background: aliceblue;margin-right: 20px;margin-left: 20px">
            <div style="height: 20px"></div>
            <div style="text-align: center">数据总览</div>
            <el-select v-model="value1" placeholder="请选择数据源" style="margin-top: 30px;margin-right: 5px;margin-left: 10%">
              <el-option
                v-for="item in option1"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择表项" style="margin-top: 30px;margin-right: 5px;margin-left: 10%">
              <el-option
                v-for="item in option2"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button style="margin-top: 20px;margin-left: 80px" @click="getData(value1,value2)">查询</el-button>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card :body-style="{ padding: '0px' }">
          <div style="height: 300px;background: aliceblue" id="main1"></div>
        </el-card>
      </el-col>
    </el-row>
<!--第三排数据选择-->
    <el-row style="margin-top: 30px;height: 300px">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
          <div style="background: aliceblue">
            <div style="height: 300px;background: aliceblue;margin-left: 10px" id="main2"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
          <div style="background: aliceblue">
            <div style="height: 300px;background: aliceblue;margin-left: 10px" id="main3"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
          <div style="background: aliceblue">
            <div style="height: 300px;background: aliceblue;margin-left: 10px" id="main4"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
<!--    第四排数据选择-->
    <el-row style="margin-top: 30px;height: 500px">
      <el-col :span="14">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
          <div slot="header" class="clearfix" style="margin-top: 15px">
            <span style="color: #333744;margin-left: 40%">数据更新情况</span>
<!--            <el-button style="float: right; padding: 3px 0" type="text" @click="jump1">查看详情</el-button>-->
          </div>
          <div style="background: aliceblue">
            <el-table
              :data="items"
              style="width: 100%;margin-top: 10px">
              <el-table-column v-for="column in tableColumns" :key="column.key"
                               v-bind:prop="column.key"
                               v-bind:label="column.label">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
          <div style="margin-left: 20px;margin-right: 20px;margin-top: 30px">
            <div slot="header" class="clearfix" style="margin-top: 15px;margin-bottom: 20px">
              <span style="color: #333744;margin-left: 40%">报警信息显示</span>
<!--              <el-button style="float: right; padding: 3px 0" type="text" @click="jump2">查看详情</el-button>-->
            </div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item v-for="message in messages" :key="message.id" :title=message.time :name=message.id>
                <div>{{message.content}}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: 'Statistic',
  data () {
    return {
      value1: [],
      option1: [],
      value2: [],
      option2: [],
      optionSelection: [
        'riverFlow',
        'riverFlowPerTest',
        'sandContent',
        'sandPerTest',
        'sandAmount',
        'temperature',
        'humidity',
        'rainfall',
        'sedimentMeasuringNumber',
        'runoffGenerationVolume',
        'sedimentAmount',
        'sedimentLostAmount',
        'rainfall',
        'runoffWeight',
        'runoffDensity'
      ],
      tableColumns: [
        { key: 'updateTime', label: '更新时间' },
        { key: 'name', label: '更新地点' }
      ],
      items: [{
        updateTime: '2016-05-02',
        name: '北京房山区'
      }],
      messages: [
        { id: 'newestTime', type: '更新时间', time: '2021.9.1', content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' }
      ],
      data_1: [],
      data_1_x: [],
      data_2_1: [820, 932, 901, 934, 1290, 1330, 1320],
      data_2_1_x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data_2_2: [
        ['2021-9-2', 0],
        ['2021-9-3', 0],
        ['2021-9-4', 0],
        ['2021-9-5', 1],
        ['2021-9-6', 2],
        ['2021-9-7', 6],
        ['2021-9-8', 4],
        ['2021-9-9', 8]],
      data_2_2_x: [],
      data_2_3: [{ value: 1048, name: '北京' },
        { value: 735, name: '黑龙江' }],
      data_2_3_x: [],
      picLocation: [

      ]
    }
  },
  watch: {
    // 对第一排下拉框的点击事件做出响应
    value1: function () {
      let recordId = 0
      recordId = this.getRecordId(this.value1)
      console.log(recordId)
      this.value2 = []
      const path1 = 'http://112.98.239.146:2333/data_demon/getRecordIndex'
      axios.get(path1, {
        params: {
          recordId: recordId
        }
      })
        .then((res) => {
          this.option2 = []
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data)
            if (this.optionSelection.indexOf(res.data[i].tableFieldName) !== -1) {
              console.log(res.data[i])
              this.option2.push({ id: res.data[i].id, label: res.data[i].tableFieldNameZh, value: res.data[i].tableFieldName })
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    value2: function () {

    }
  },
  methods: {
    // jump1 () {
    //   window.location.href = '/DataCharts'
    // },
    // jump2 () {
    //   window.location.href = '/MessageTable'
    // },
    getData (deviceID, tableFieldName) {
      const tabelId = this.getRecordId(deviceID)
      const text = ['/data_demon/listRecordOneData', '/data_demon/listRecordTwoData', '/data_demon/listRecordThreeData', '/data_demon/listRecordFourData']
      const date = ['testDate', 'testDatetime', 'testDatetime', 'dateTime']
      const path = 'http://112.98.239.146:2333' + text[tabelId - 1]
      axios.get(path, {
        params: {
          count: 10000,
          deviceId: deviceID,
          offset: 0
        }
      })
        .then((res) => {
          console.log(res.data)
          console.log(tableFieldName)
          this.data_1 = []
          this.data_1_x = []
          for (let i = 0; i < res.data.length; i++) {
            this.data_1.push(res.data[i][tableFieldName])
            this.data_1_x.push(res.data[i][date[tabelId - 1]])
            console.log(date[tabelId - 1])
          }
          this.myEcharts1()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    getRecordId (id) {
      if (id < 10) return 4
      if (id > 10000) return 3
      if (id > 4000) return 2
      return 1
    },
    // 从后端中获取消息
    getMessage () {
      // 获取最新更新数据表格信息
      const path1 = 'http://112.98.239.146:2333/data_demon/listStationDetails'
      axios.get(path1, {
        params: {
          count: 7,
          offset: 0
        }
      })
        .then((res) => {
          this.items = res.data
          console.log(res.data)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      // 获取后端的全部报错细节
      const path2 = 'http://112.98.239.146:2333/data_demon/listWarningDetails'
      axios.get(path2)
        .then((res) => {
          this.messages = res.data
          console.log(res.data)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      // 获取数据与日期的关系折线图
      const path3 = 'http://112.98.239.146:2333/data_demon/listDailyData'
      axios.get(path3, {
        params: {
          count: 5,
          offset: 0
        }
      })
        .then((res) => {
          this.data_2_1 = []
          this.data_2_1_x = []
          for (let i = 0; i < res.data.length; i++) {
            this.data_2_1.push(res.data[i].size)
            this.data_2_1_x.push(res.data[i].updateTime)
          }
          this.data_2_1 = this.data_2_1.reverse()
          this.data_2_1_x = this.data_2_1_x.reverse()
          this.myEcharts2()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      // 获取两地数据量比例
      const path4 = 'http://112.98.239.146:2333/data_demon/listDataCount'
      axios.get(path4)
        .then((res) => {
          this.data_2_3 = []
          console.log(res.data)
          this.data_2_3.push({ value: res.data[0], name: '北京' })
          this.data_2_3.push({ value: res.data[1], name: '黑龙江' })
          this.myEcharts4()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      // 获取所有监测站信息
      const path5 = 'http://112.98.239.146:2333/data_demon/listStationList'
      axios.get(path5)
        .then((res) => {
          this.option1 = []
          for (let i = 0; i < res.data.length; i++) {
            this.option1.push({ id: res.data[i].deviceId, label: res.data[i].name, value: res.data[i].deviceId })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    // 设置标签页面的展开与收拢
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    myEcharts1 () {
      const myChart = echarts.init(document.getElementById('main1'))
      // 指定图表的配置项和数据
      const option = {
        title: {
        },
        // legend: {
        //   data: ['bar', 'bar2']
        // },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          },
          {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          }
        ],
        tooltip: {},
        xAxis: {
          data: this.data_1_x,
          splitLine: {
            show: false
          }
        },
        yAxis: {
        },
        series: [{
          name: 'bar1',
          type: 'bar',
          data: this.data_1,
          emphasis: {
            focus: 'series'
          },
          animationDelay (idx) {
            return idx * 10 + 100
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate (idx) {
          return idx * 5
        }
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    myEcharts2 () {
      var chartDom = document.getElementById('main2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '每日数据量变化',
          padding: [270, 50, 20, 0]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data_2_1_x
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.data_2_1,
          type: 'line',
          areaStyle: {}
        }]
      }

      option && myChart.setOption(option)
    },
    myEcharts3 () {
      var chartDom = document.getElementById('main3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '每日报警消息变化',
          padding: [270, 50, 20, 0]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [{
            gt: 1,
            lt: 7,
            color: 'rgba(0, 0, 180, 0.2)'
          }]
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#5470C6',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [
                { xAxis: 1 },
                { xAxis: 3 },
                { xAxis: 5 },
                { xAxis: 7 }
              ]
            },
            areaStyle: {},
            data: this.data_2_2
          }
        ]
      }

      option && myChart.setOption(option)
    },
    myEcharts4 () {
      var chartDom = document.getElementById('main4')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '数据来源分布',
          padding: [270, 50, 20, 0]
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data_2_3
          }
        ]
      }

      option && myChart.setOption(option)
    }

  },
  created () {
    this.getMessage()
  },
  mounted () {
    this.myEcharts1()
    this.myEcharts2()
    this.myEcharts3()
    this.myEcharts4()
  }

}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
