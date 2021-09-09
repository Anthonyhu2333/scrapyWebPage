<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>网站爬虫</el-breadcrumb-item>
      <el-breadcrumb-item>网站爬虫信息展示</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addWebsiteState()">新增网站</el-button>
      <el-dialog title="新增网站" :visible.sync="addWebsiteVisible" width="50%" @close="resetForm()">
        <el-form :model="websitesInfo" :rules="addruleForm" ref="addFormRef" label-width="100px">
          <el-form-item label="网站名称" prop="websiteName">
            <el-input v-model="websitesInfo.websiteName"></el-input>
          </el-form-item>
          <el-form-item label="url" prop="url">
            <el-input v-model="websitesInfo.url"></el-input>
          </el-form-item>
          <el-form-item label="爬虫选择" prop="scrapySelect">
            <el-select v-model="websitesInfo.scrapySelect" placeholder="请选择爬虫">
              <el-option v-for = "(item,index) in scrapy" :label= "item" :value = "item" :key = "index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addWebsiteVisible = false">取 消</el-button>
          <el-button type="warning" @click="testWebsite(websitesInfo.url)">测试联通</el-button>
          <el-button type="primary" @click="addWebsite()">添加设备</el-button>
        </span>
      </el-dialog>
      <el-table :data="websites" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="websiteName" label="网站名称"> </el-table-column>
        <el-table-column prop="url" label="网站url"> </el-table-column>
        <el-table-column prop="state" label="网站状态"></el-table-column>
        <el-table-column prop = "offOrOn" label="网站检测开关">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.offOrOn" @change="stateOffOrOn(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="scrapySelect" label="爬虫选择"></el-table-column>
        <el-table-column prop="scrapyState" label="爬虫状态"></el-table-column>
        <el-table-column prop = "scrapyOffOrOn" label="爬虫开关">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.scrapyOffOrOn" @change="scrapyStateOffOrOn($event,scope.row)"
                       :on-value="1"
                       :off-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editWebsite(scope.row)"></el-button>
            <el-dialog title="修改网站信息" :visible.sync="editWebsiteVisible" width="50%" @close="resetEditForm()">
              <el-form :model="editWebsiteInfo" :rules="editRuleForm" ref="editFormRef" label-width="100px" >
                <el-form-item label="网站名称" prop="websiteName">
                  <el-input v-model="editWebsiteInfo.websiteName"></el-input>
                </el-form-item>
                <el-form-item label="url" prop="url">
                  <el-input v-model="editWebsiteInfo.url"></el-input>
                </el-form-item>
                <el-form-item label="爬虫选择" prop="scrapySelect">
                  <el-select v-model="editWebsiteInfo.scrapySelect" placeholder="请选择爬虫">
                    <el-option v-for = "(item,index) in scrapy" :label= "item" :value = "item" :key = "index"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editWebsiteVisible = false">取消</el-button>
                <el-button type="primary" @click="editWebsiteSubmit (editWebsiteInfo)">确 定</el-button>
              </span>
            </el-dialog>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteWebsiteInfo(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editWebsiteInfo: {
        websiteName: '',
        url: '',
        scrapySelect: ''
      },
      scrapy: ['', ''],
      // 网站修改页面可视化

      editWebsiteVisible: false,
      // 增加页面可视化
      addWebsiteVisible: false,
      websites: [{
        websiteName: '',
        url: '',
        state: '',
        offOrOn: false,
        scrapySelect: '',
        scrapyState: '',
        scrapyOffOrOn: false
      }],
      websitesInfo: {
        websiteName: '',
        url: '',
        state: '',
        scrapySelect: ''
      },
      addruleForm: {
        websiteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url地址', trigger: 'blur' }
        ],
        scrapySelect: [
          { required: true, message: '请选择爬虫', trigger: 'blur' }
        ]
      },
      editRuleForm: {
        websiteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url地址', trigger: 'blur' }
        ],
        scrapySelect: [
          { required: true, message: '请选择爬虫', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
    this.getWebsitelist()
  },
  methods: {
    resetEditForm () {
      // 修改页面重新表单
      console.log(this.$refs.editFormRef)
      this.$refs.editFormRef.resetFields()
    },
    async getScrapyList () {
      // 获取所有的爬虫
      const { data: res } = await this.$http.get('selectScrapys')
      if (res.code !== 200) {
        return this.$message.error('爬虫获取失败')
      }
      this.scrapy = res.entity
    },
    addWebsiteState () {
      // 点击新增网站按钮
      this.addWebsiteVisible = true
      this.getScrapyList()
    },
    editWebsiteSubmit (WebsiteInfo) {
      // 提交修改以后的内容
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('updateWebsite', WebsiteInfo)
        if (res.code !== 200) {
          return this.$message.error('编辑失败')
        }
        this.$message.success('编辑成功')
        this.getWebsitelist()
        this.editWebsiteVisible = false
      })
    },

    editWebsite (website) {
      // 点击修改按钮
      this.editWebsiteVisible = true
      this.editWebsiteInfo = website
    },
    async deleteWebsiteInfo (WebsiteInfo) {
      // 删除某一个网站
      console.log(WebsiteInfo)
      const confirmResult = await this.$confirm('此操作将永久删除该条网站信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const params = new URLSearchParams()
      params.append('url', WebsiteInfo.url)
      const { data: res } = await this.$http.post('deleteWebsite', params)
      if (res.code !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getWebsitelist()
    },
    addWebsite () {
      // 添加网站
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('addWebsite', this.websitesInfo)
        if (res.code !== 200) {
          return this.$message.error('网站添加失败')
        }
        this.$message.success('网站添加成功')
        this.getWebsitelist()
        this.resetForm()
        this.addWebsiteVisible = false
      })
    },
    resetForm () {
      // 重置新增页面的数据
      this.$refs.addFormRef.resetFields()
    },
    async getWebsitelist () {
      // 获取网站列表
      const { data: res } = await this.$http.get('listWebsites')
      if (res.code !== 200) {
        return this.$message.error('获取网站列表失败')
      }
      this.websites = res.entity
    },
    async stateOffOrOn (scope) {
      // 修改检测状态
      const params = new URLSearchParams()
      params.append('url', scope.url)
      const { data: res } = await this.$http.post('updateOffOrOn', params)
      if (res.code !== 200) {
        return this.$message.error('操作失败')
      }
      setTimeout(callback => {
        this.getWebsitelist()
      }, 2000)
    },
    async testWebsite (url) {
      // 测试网站是否联通可达
      const params = new URLSearchParams()
      params.append('url', url)
      const { data: res } = await this.$http.post('testWebsiteIsOk', params)
      if (res.code !== 200) {
        return this.$message.error('该url地址不可达')
      }
      this.$message.success('该url可达')
    },

    async scrapyStateOffOrOn ($event, website) {
      // 开启爬虫按钮
      var isActive = $event
      const params = new URLSearchParams()
      params.append('scrapyName', website.scrapySelect)
      var command
      if (isActive === true) command = 'openScrapyInstance'
      else command = 'openScrapyInstance'
      const { data: res } = await this.$http.post(command, params)
      if (res.code === 500) {
        return this.$message.error('命令执行失败')
      }
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
