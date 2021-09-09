<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" style="height: 200px;background: aliceblue;margin-right: 20px;margin-left: 20px">
          <div style="height: 20px"></div>
          <div style="text-align: center">数据总览</div>
          <el-select v-model="value1" placeholder="请选择数据源" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">
            <el-option
              v-for="item in option1"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button style="margin-top: 20px;margin-left: 80px" @click="getData(value1)">查询</el-button>
        </el-card>
      </el-col>
      <el-col :span="18">
<!--          <el-image-->
<!--            style="height: 300px;margin-left: 200px"-->
<!--            :src="require('/Users/anthony/Desktop/data_collect_web/src/assets/pic/statistic_1.jpg')"-->
<!--            :fit="cover"></el-image>-->
      </el-col>
    </el-row>
    <el-row style="margin-top: 40px">
      <el-table
        :data="items"
        style="width: 100%">
        <el-table-column v-for="column in tableColumns" :key="column.key"
                         v-bind:prop="column.key"
                         v-bind:label="column.label">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataCharts',
  data () {
    return {
      value1: [],
      option1: [],
      items: [],
      tableColumns: [
        { key: 'station_name', label: '地点' },
        { key: 'device_number', label: '设备标号' },
        { key: 'test_date', label: '日期' },
        { key: 'test_time', label: '时间' },
        { key: 'river_flow', label: '径流量' },
        { key: 'river_flow_per_test', label: '每小时流量' },
        { key: 'sand_content', label: '含沙量' }
      ]
    }
  },
  methods: {
    getData (deviceID) {
      const tabelId = this.getRecordId(deviceID)
      const path1 = 'http://localhost:8080/data_demon/getRecordAllNames'
      const text = ['/data_demon/listRecordOneData', '/data_demon/listRecordTwoData', '/data_demon/listRecordThreeData', '/data_demon/listRecordFourData']
      const path2 = 'http://localhost:8080' + text[tabelId - 1]
      axios.get(path1, {
        params: {
          recordId: tabelId
        }
      })
        .then((res) => {
          console.log(res.data)
          this.tableColumns = []
          for (let i = 0; i < res.data.length; i++) {
            this.tableColumns.push({ key: res.data[i].tableFieldName, label: res.data[i].tableFieldNameZh })
          }
          console.log(this.tableColumns)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      axios.get(path2, {
        params: {
          count: 100,
          deviceId: deviceID,
          offset: 0
        }
      })
        .then((res) => {
          console.log(res.data)
          this.items = res.data
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
    getMessage () {
      const path5 = 'http://localhost:8080/data_demon/listStationList'
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
    }
  },
  created () {
    this.getMessage()
  }
}
</script>

<style scoped>

</style>
