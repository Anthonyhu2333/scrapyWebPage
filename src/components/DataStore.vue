<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>网站爬虫</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库与告警</el-breadcrumb-item>
      <el-breadcrumb-item>数据入库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data = 'websiteslist' stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="websiteName" label="网站名称"> </el-table-column>
        <el-table-column prop="url" label="网站url"> </el-table-column>
        <el-table-column prop="state" label="网站状态"></el-table-column>
        <el-table-column prop="scrapySelect" label="爬虫实例"></el-table-column>
        <el-table-column prop="scrapyState" label="爬虫状态"></el-table-column>
        <el-table-column label="数据表" prop = "tableName">
          <template slot-scope = "scope">
            <el-select v-model = "scope.row.tableName" placeholder="请选择数据表">
              <el-option v-for = "(item,index) in dbTableList" :label= "item" :value = "item" :key = "index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="dataStore(scope.row)">数据入库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="数据入库" :visible.sync= "dataStoreVisible" width="50%" @close="resetForm()">
        <el-row><el-col :span="24">爬虫保存数据案例: {{stringInfo}}</el-col></el-row>
        <el-form :model="dropInfo" :rules= "addruleForm" ref="addFormRef" label-width="100px" margin-top="3px">
          <el-row v-for = "(item,index) in dropInfo.items " :key="index" >
            <el-col :span= "10">
              <el-form-item prop="item.topic" label="topic列表:" font-size="60px">
                <el-select v-model="dropInfo.items[index].topic" placeholder= "请选择topic">
                  <el-option v-for = "(value,key,index1) in topics" :label= "key" :value = "key" :key = "index1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span = "10">
              <el-form-item prop="item.tableName" label="数据库列表:">
                <el-select v-model="dropInfo.items[index].tableName" placeholder= "请选择数据库列表">
                  <el-option v-for = "(item2,index2) in tableNames" :label= "item2" :value = "item2" :key = "index2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col span="4">
              <el-button v-if="index!==0" type="danger" @click="removeNewTag(index)" icon="el-icon-delete"></el-button>
              <el-button v-else type="primary" @click="addNewDrop()">+</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>入库定时设置：</el-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.day" controls-position="right" :min="0"></el-input-number><span>天</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.hour" controls-position="right" :min="0"></el-input-number><span>时</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.min" controls-position="right" :min="0"></el-input-number><span>分</span></e-col>
            <e-col><el-input-number size="mini" v-model="dropInfo.time.second" controls-position="right" :min="0"></el-input-number><span>秒</span></e-col>
          </el-row>
        </el-form>
        <span slot="footer">
          <el-button @click="dataStoreVisible = false">取 消</el-button>
          <el-button type="primary" @click="dataStoreSubmit(dropInfo)">入库</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      websiteslist: [{
        websiteName: 'websiteName',
        url: 'url',
        state: '',
        scrapySelect: 'scrapyName',
        scrapyState: ''
      }],
      // 选择的数据表的名字
      dbTableList: [
        '1', '2', '3'
      ],
      // 点击数据入库按钮弹出的对话框
      dataStoreVisible: false,
      // 爬虫保存数据案例
      stringInfo: '',
      dropInfo: {
        websiteName: '',
        websiteUrl: '',
        tableName: '',
        scrapyName: '',
        items: [
          {
            topic: '',
            tableName: ''
          }
        ],
        time: {
          day: '',
          hour: '',
          min: '',
          second: ''
        }
      },
      topics: {
        1: '1',
        '2-topic': 'topic'
      },
      tableNames: ['1', '2', '3']
    }
  },
  created () {
    this.getWebsitelist()
    this.getDBTableList()
  },
  methods: {
    async getWebsitelist () {
      // 获取网站列表
      const { data: res } = await this.$http.get('listWebsites')
      if (res.code !== 200) {
        return this.$message.error('获取网站列表失败')
      }
      this.websiteslist = res.entity
    },
    async getDBTableList () {
      // 获取数据表名字
      const { data: res } = await this.$http.get('listDBTableName')
      if (res.code !== 200) {
        return this.$message.error('获取数据列表失败')
      }
      this.dbTableList = res.entity
    },
    async dataStore (website) {
      this.dataStoreVisible = true
      console.log(website)
      this.dropInfo.tableName = website.tableName
      this.dropInfo.scrapyName = website.scrapySelect
      this.dropInfo.websiteName = website.websiteName
      this.dropInfo.websiteUrl = website.url
      const params = new URLSearchParams()
      params.append('scrapyName', website.scrapySelect)

      const { data: res } = await this.$http.post('selectTopicByScrapyName', params)
      if (res.code !== 200) {
        return this.$message.error('获取爬虫topic失败')
      }
      const info = new URLSearchParams()
      info.append('topic', res.entity)
      const { data: res2 } = await this.$http.post('showTopicOneInfo', info)
      if (res2.code !== 200) {
        return this.$message.error('根据爬虫获取爬虫实例失败')
      }
      this.stringInfo = res2.entity
      this.topics = res2.entity
      this.getTableNames(website.tableName)
    },
    async getTableNames (tableName) {
      const params = new URLSearchParams()
      params.append('tableName', tableName)
      const { data: res } = await this.$http.post('listTableColumn', params)
      if (res.code !== 200) {
        return this.$message.error('获取数据列表失败')
      }
      this.tableNames = res.entity
    },
    addNewDrop () {
      this.dropInfo.items.push({
        tableName: '',
        topic: ''
      })
    },
    async dataStoreSubmit (dropInfo) {
      // datastore
      console.log(dropInfo)
      const time = (dropInfo.time.second) + dropInfo.time.min * 60 + dropInfo.time.hour * 3600 + dropInfo.time.day * 3600 * 24
      const tableName = dropInfo.tableName
      const tableList = []
      const topicList = []
      for (let i = 0; i < dropInfo.items.length; i++) {
        tableList.push(dropInfo.items[i].tableName)
        topicList.push(dropInfo.items[i].topic)
      }
      const params = new URLSearchParams()
      params.append('tableName', tableName)
      params.append('seconds', time)
      params.append('topicColumns', topicList)
      params.append('DBTableColumns', tableList)
      params.append('websiteName', dropInfo.websiteName)
      params.append('websiteUrl', dropInfo.websiteUrl)
      params.append('scrapyName', dropInfo.scrapyName)
      const { data: res } = await this.$http.post('insertKafkaIntoDBTable', params)
      if (res.code !== 200) {
        return this.$message.error('数据库插入失败')
      }
      this.$message.success('数据插入成功')
    },
    removeNewTag (index) {
      this.dropInfo.items.pop(index)
    },
    resetForm () {
      // 重置新增页面的数据
      console.log(this.$refs.addFormRef)
      this.$refs.addFormRef.resetFields()
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
.el-input-number{
  width: 75px;
}
</style>
