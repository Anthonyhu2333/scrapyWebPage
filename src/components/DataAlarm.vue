<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>网站爬虫</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库与告警</el-breadcrumb-item>
      <el-breadcrumb-item>数据告警</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data = 'alarmslist' stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="dataInfo" label="错误数据"> </el-table-column>
        <el-table-column prop="errorUrl" label="错误数据所属url"> </el-table-column>
        <el-table-column prop="errorSiteName" label="错误数据所属网站名"></el-table-column>
        <el-table-column prop="errorLog" label="错误原因"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="additionalInfo" label="附加信息"></el-table-column>
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
      const { data: res } = await this.$http.get('listDataErrorList')
      if (res.code !== 200) {
        return this.$message.error('数据告警获取失败')
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
