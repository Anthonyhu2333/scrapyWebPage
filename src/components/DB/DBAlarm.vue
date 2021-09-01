<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>远程数据库</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库与告警</el-breadcrumb-item>
      <el-breadcrumb-item>数据告警</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data = 'alarmslist' stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="errorInfo" label="告警名称"> </el-table-column>
        <el-table-column prop="sqlInfo" label="sql告警语句"> </el-table-column>
        <el-table-column prop="destination" label="监控队列"></el-table-column>
        <el-table-column prop="errorTime" label="告警时间"></el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alarmslist: ''
    }
  },
  created () {
    this.getAlarmsList()
  },
  methods: {
    async getAlarmsList () {
      const { data: res } = await this.$http.get('listCanalDataErrorList')
      if (res.code !== 200) {
        return this.$message.error('canal同步告警信息获取失败')
      }
      this.alarmslist = res.entity
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom:15px;
  font-size: 12px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.25)!important;
}
</style>
