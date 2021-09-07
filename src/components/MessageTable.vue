<template>
  <div>
    <el-row>
      <el-col :span="6">
<!--        <el-card :body-style="{ padding: '0px' }" style="height: 300px;background: aliceblue;margin-right: 20px;margin-left: 20px">-->
<!--          <div style="height: 20px"></div>-->
<!--          <div style="text-align: center">消息类型筛选</div>-->
<!--          <el-select v-model="value" placeholder="请选择消息来源" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <el-select v-model="value" placeholder="请选择消息类型" style="margin-top: 30px;margin-right: 5px;margin-left: 25px">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <el-button style="margin-top: 20px;margin-left: 80px">查询</el-button>-->
<!--        </el-card>-->
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
  name: 'MessageTable',
  data () {
    return {
      items: [
        { device_number: '1' }
      ],
      tableColumns: [
        { key: 'id', label: 'ID' },
        { key: 'url', label: '网址' },
        { key: 'time', label: '时间' },
        { key: 'type', label: '类型' },
        { key: 'content', label: '内容' }
      ]
    }
  },
  methods: {
    getMessage () {
      const path = 'http://localhost:9999/data_demon/listWarningDetails'
      axios.get(path)
        .then((res) => {
          this.items = res.data
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
