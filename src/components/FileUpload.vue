<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
    <el-breadcrumb-item>文件上传下载</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-upload action="http://112.98.239.146:2333/uploadFile">
      <el-button type="primary">上传文件</el-button>
    </el-upload>
    <el-table :data="fileInfo" stripe border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="fileName" label="文件名称"> </el-table-column>
      <el-table-column label="文件链接">
        <template slot-scope="scope">
          <el-button icon = "el-icon-download" @click = 'download(scope.row)'></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click = "deleteFile(scope.row)"></el-button>
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
      addFileVisible: false,
      // 上传文件时选择的文件list
      file: [],
      // 页面显示的时候的file信息
      fileInfo: [{
        fileName: '文件名称',
        fileUrl: 'Url'
      }, {
        fileName: '文件名称',
        fileUrl: ' Url'
      }]
    }
  },
  created () {
    this.getFileList()
  },
  methods: {
    async getFileList () {
      const { data: res } = await this.$http.get('listFiles')
      if (res.code !== 200) {
        return this.$message.error('文件获取失败')
      }
      this.fileInfo = res.entity
    },
    addFile () {
      this.addFileVisible = true
    },
    resetForm () {

    },
    // 文件上传的方法
    // 文件下载按钮
    async download (File) {
      const { data: res } = await this.$http.get(`download?id=${File.id}`)
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('文件下载失败')
      }
      this.$message.success('文件下载成功')
    },
    // 文件删除按钮
    async deleteFile (File) {
      const params = new URLSearchParams()
      params.append('id', File.id)
      const { data: res } = await this.$http.post('deleteFile', params)
      if (res.code !== 200) {
        return this.$message.error('删除失败')
      }
      this.getFileList()
      return this.$message.success('删除成功')
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
