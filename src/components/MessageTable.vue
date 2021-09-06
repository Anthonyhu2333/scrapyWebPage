<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" style="height: 300px;background: aliceblue;margin-right: 20px;margin-left: 20px">
          <div style="height: 20px"></div>
          <div style="text-align: center">消息类型筛选</div>
          <el-select v-model="value" placeholder="请选择消息来源" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择消息类型" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">
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
export default {
  name: 'MessageTable',
  data () {
    return {
      items: [
        { device_number: '1' }
      ],
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
  }
}
</script>

<style scoped>

</style>
