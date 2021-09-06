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
            <el-select v-model="value" placeholder="请选择数据源" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择表项" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button style="margin-top: 20px;margin-left: 80px">查询</el-button>
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
      <el-col :span="10">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
          <div slot="header" class="clearfix" style="margin-top: 15px">
            <span style="color: #333744;margin-left: 40%">数据更新情况</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
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
      <el-col :span="14">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
          <div style="margin-left: 20px;margin-right: 20px;margin-top: 30px">
            <div slot="header" class="clearfix" style="margin-top: 15px;margin-bottom: 20px">
              <span style="color: #333744;margin-left: 40%">报警信息显示</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
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
      tableColumns: [
        { key: 'newestTime', label: '更新时间' },
        { key: 'newestLocation', label: '更新地点' }
      ],
      items: [{
        newestTime: '2016-05-02',
        newestLocation: '北京房山区'
      }],
      messages: [
        { id: 'newestTime', type: '更新时间', time: '2021.9.1', content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' }
      ],
      data_1: [],
      data_1_x: [],
      data_2_1: [820, 932, 901, 934, 1290, 1330, 1320],
      data_2_1_x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data_2_2: [['2019-10-10', 200],
        ['2019-10-11', 560],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-14', 250],
        ['2019-10-15', 300],
        ['2019-10-16', 450],
        ['2019-10-17', 300],
        ['2019-10-18', 100]],
      data_2_2_x: [],
      data_2_3: [{ value: 1048, name: '北京' },
        { value: 735, name: '黑龙江' }],
      data_2_3_x: [],
      picLocation: [

      ]
    }
  },
  methods: {
    // 从后端中获取消息
    getMessage () {
      const path = 'http://localhost:5000/logView'
      axios.get(path)
        .then((res) => {
          [this.items] = res.data.items
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
          text: ''
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
          text: '每日数据变化',
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
          text: '每日消息量变化',
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
            lt: 3,
            color: 'rgba(0, 0, 180, 0.4)'
          }, {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 0, 180, 0.4)'
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
