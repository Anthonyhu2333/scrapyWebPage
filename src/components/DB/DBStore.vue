<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>远程数据库</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库与告警</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card >
      <el-table :data = 'canalList' stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="additionalInfo" label="实例名称"></el-table-column>
        <el-table-column prop="serverAddress" label="canal-Ip"></el-table-column>
        <el-table-column prop="port" label="canal-Port"></el-table-column>
        <el-table-column prop="destination" label="监控队列名称"></el-table-column>
        <el-table-column prop="topic" label="Kafka-Topic"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="启动实例" placement="top">
              <el-button type="success" size="mini" @click="openInstance(scope.row)" icon = "el-icon-switch-button"></el-button>
            </el-tooltip>
            <el-tooltip content="数据同步" placement="top">
              <el-button type="primary" size="mini" @click="dataStore(scope.row)" icon="el-icon-refresh"></el-button>
            </el-tooltip>
            <el-tooltip content="停止同步" placement="top">
              <el-button type="danger" size="mini" @click="stopInstance(scope.row)" icon="el-icon-circle-close"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="数据同步" :visible.sync= "dataStoreVisible" width="50%" @close="resetForm()">
        <el-form :model="dropInfo" :rules= "addruleForm" ref="addFormRef" label-width="100px" margin-top="3px">
          <el-card v-for="(item,index) in dropInfo.tableList" :key="index" style="margin:2px">
            <el-button v-if="index!==0" type="danger" @click="removeNewTag(index)" icon="el-icon-delete" size="mini"></el-button>
            <el-button v-else type="primary" @click="addNewDrop()" size="mini">+</el-button>
            <el-form-item prop ="item.tableName" label="同步表名:" >
              <el-input v-model="dropInfo.tableList[index].tableName" placeholder="请输入同步表名"></el-input>
            </el-form-item>
            <el-form-item prop="item.syncOperate" label="同步操作">
                <el-checkbox-group v-model="dropInfo.tableList[index].syncOperate" size="mini">
                  <el-checkbox label="1" border>创建表</el-checkbox>
                  <el-checkbox label="2" border>删除表</el-checkbox>
                  <el-checkbox label="3" border>插入记录</el-checkbox>
                  <el-checkbox label="4" border>更新记录</el-checkbox>
                  <el-checkbox label="5" border>删除记录</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          </el-card>
          <el-row>
            <el-col>同步定时设置：</el-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.day" controls-position="right" :min="0"></el-input-number><span>天</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.hour" controls-position="right" :min="0"></el-input-number><span>时</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.min" controls-position="right" :min="0"></el-input-number><span>分</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.second" controls-position="right" :min="0"></el-input-number><span>秒</span></e-col>
          </el-row>
        </el-form>
        <span slot="footer">
          <el-button @click="dataStoreVisible = false">取 消</el-button>
          <el-button type="primary" @click="dataStoreSubmit(dropInfo)">同步</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canalList: [
        {
          topic: '1'
        }
      ],
      // 选择的数据表的名字
      // 点击数据入库按钮弹出的对话框
      dataStoreVisible: false,
      // 爬虫保存数据案例
      stringInfo: '',
      dropInfo: {
        tableList: [
          {
            tableName: '同步表名',
            syncOperate: []
          }
        ],
        topic: '',
        time: {
          day: '',
          hour: '',
          min: '',
          second: ''
        }
      }
    }
  },
  created () {
    this.getCanalList()
    this.getDBTableList()
  },
  methods: {
    async getCanalList () {
      const { data: res } = await this.$http.get('listCanal')
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('数据库同步实例获取失败')
      }
      this.canalList = res.entity
    },
    async dataStore (website) {
      this.dataStoreVisible = true
      console.log(website)
      this.dropInfo.topic = website.topic
    },
    async dataStoreSubmit (dropInfo) {
      // datastore
      const time = (dropInfo.time.second) + dropInfo.time.min * 60 + dropInfo.time.hour * 3600 + dropInfo.time.day * 3600 * 24
      const params = {}
      params.seconds = time
      params.topic = dropInfo.topic
      params.tableList = dropInfo.tableList
      console.log(params)
      const { data: res } = await this.$http.post('addConsumer', params)
      if (res.code !== 200) {
        return this.$message.error('数据库同步失败')
      }
      this.$message.success('数据同步成功')
    },
    resetForm () {
      // 重置新增页面的数据
      console.log(this.$refs.addFormRef)
      this.$refs.addFormRef.resetFields()
    },
    async openInstance (instance) {
      console.log(instance)
      const { data: res } = await this.$http.post('startCanalInstance', instance)
      if (res.code !== 200) {
        return this.$message.error('实例启动失败')
      }
      this.$message.success('实例启动成功')
    },
    async stopInstance (instance) {
      const params = new URLSearchParams()
      params.append('topic', instance.topic)
      const { data: res } = await this.$http.post('stopKafkaConsumer', params)
      if (res.code !== 200) {
        return this.$message.error('停止同步失败')
      }
      return this.$message.success('停止同步成功')
    },
    removeNewTag (index) {
      this.dropInfo.tableList.pop(index)
    },
    addNewDrop () {
      this.dropInfo.tableList.push({
        tableName: '',
        syncOperate: []
      })
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.25);

}
.el-checkbox{
  margin: 1px;
}
.el-input-number{
  width: 75px;
}
</style>
