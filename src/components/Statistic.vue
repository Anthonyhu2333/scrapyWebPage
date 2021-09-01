<template>
  <div style="margin-left: 30px;margin-right: 30px">
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <div style="height: 300px;background: aliceblue" id="main"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;height: 300px">
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 300px;
        margin-right: 10px;margin-left: 10px">
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 30px;height: 500px">
      <el-col :span="10">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card :body-style="{ padding: '0px' }" style="color: aliceblue;height: 500px;
        margin-right: 10px;margin-left: 10px">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Statistic',
  methods: {
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      // eslint-disable-next-line no-undef
      const myChart = echarts.init(document.getElementById('main'))
      const { xAxisData } = this
      const { data1 } = this
      const { data2 } = this
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '数据可视化'
        },
        legend: {
          data: ['bar', 'bar2']
        },
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
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
        },
        series: [{
          name: 'bar',
          type: 'bar',
          data: data1,
          emphasis: {
            focus: 'series'
          },
          animationDelay (idx) {
            return idx * 10
          }
        }, {
          name: 'bar2',
          type: 'bar',
          data: data2,
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
    }
  },
  mounted () {
    this.myEcharts()
  }
}
</script>

<style scoped>
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
