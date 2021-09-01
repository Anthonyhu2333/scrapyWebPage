<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
    <el-breadcrumb-item>爬虫配置</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-button type = "primary" @click="addScrapyInstance()">新增爬虫实例</el-button>
    <el-dialog title="添加爬虫实例" :visible.sync="addScrapyInstanceVisible" width="50%" @close="resetScrpayInstanceForm()">
      <el-form :model="scrapyInstanceInfo" :rules="addScrapyruleForm" ref="addScrapyInstanceRef" label-width="100px">
        <el-form-item label="实例名称" prop="scrapyName">
          <el-input v-model="scrapyInstanceInfo.scrapyName" ></el-input>
        </el-form-item>
        <el-form-item label ="开启爬虫命令" prop = "openScrapyCommand">
          <el-input v-model="scrapyInstanceInfo.openScrapyCommand" ></el-input>
        </el-form-item>
        <el-form-item label ="关闭爬虫命令" prop = "closeScrapyCommand">
          <el-input v-model="scrapyInstanceInfo.closeScrapyCommand" ></el-input>
        </el-form-item>
<!--        <el-form-item label ="爬虫Topic" prop = "scrapyTopic">-->
<!--          <el-input v-model="scrapyInstanceInfo.scrapyTopic" ></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label ="上传文件" prop = "fileSavePath">
          <!-- <el-input type = "file" v-model="scrapyInstanceInfo.fileSavePath" id = "fileInput"></el-input> -->
          <el-upload
           action=""
           :limit="1"
           show-file-list
           drag
           :file-list = "files"
           :http-request="uploadFile">
           <i class="el-icon-upload"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addScrapyInstanceVisible = false">取 消</el-button>
          <el-button type="primary" @click="addScrapyInstanceSubmit()">添加</el-button>
      </span>
    </el-dialog>
    <el-table :data="scrapysList" stripe border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="scrapyName" label="爬虫实例名称"></el-table-column>
      <el-table-column prop="fileSavePath" label="爬虫文件保存路径"></el-table-column>
      <el-table-column prop="openScrapyCommand" label="爬虫开启命令"></el-table-column>
      <el-table-column prop="closeScrapyCommand" label="爬虫关闭命令"></el-table-column>
<!--      <el-table-column prop="scrapyTopic" label="爬虫对应topic"></el-table-column>-->
      <el-table-column prop="topic" label="保存队列"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editScrapyInstance(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click ="deleteScrapyInstance(scope.row)"></el-button>
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
      addScrapyInstanceVisible: false,
      // 新增爬虫实例表单内的数据
      scrapyInstanceInfo: {
        scrapyName: '',
        openScrapyCommand: '',
        closeScrapyCommand: '',
        // scrapyTopic: '',
        fileSavePath: ''
      },
      files: [],
      scrapysList: '',
      addScrapyruleForm: {
        scrapyName: [
          { required: true, message: '请输入爬虫实例名称', trigger: 'blur' }
        ],
        scrapyCode: [
          { required: true, message: '请输入爬虫实例执行命令', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getScrapyList()
  },
  methods: {
    async getScrapyList () {
      const { data: res } = await this.$http.get('listScrapyInstance')
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('爬虫实例获取失败')
      }
      this.scrapysList = res.entity
    },
    addScrapyInstance () {
      this.addScrapyInstanceVisible = true
    },
    editScrapyInstance (scrapy) {
      console.log(scrapy)
    },
    deleteScrapyInstance (scrapy) {
      console.log(scrapy)
    },
    resetScrpayInstanceForm () {
      this.$refs.addScrapyInstanceRef.resetFields()
    },
    async uploadFile (params) {
      const file = params.file
      const formData = new window.FormData()
      formData.append('file', file)
      const { data: res1 } = await this.$http.post('uploadScrapyFile', formData)
      if (res1.code !== 200) {
        return this.$message.error('文件上传失败')
      }
      this.scrapyInstanceInfo.fileSavePath = res1.entity
    },
    addScrapyInstanceSubmit () {
      this.$refs.addScrapyInstanceRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('addScrapyInstance', this.scrapyInstanceInfo)
        if (res.code !== 200) return this.$message.error('爬虫添加失败')
        this.$message.success('爬虫添加成功')
        this.getScrapyList()
        this.addScrapyInstanceVisible = false
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.25)!important;
}
</style>
