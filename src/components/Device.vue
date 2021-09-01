<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统设备</el-breadcrumb-item>
      <el-breadcrumb-item>设备状态展示</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addDeviceVisible = true">添加设备</el-button>
      <el-dialog title="添加设备" :visible.sync="addDeviceVisible" width="50%"  @close="resetForm()">
        <el-form v-model="systemInfo" :rules="addruleForm" ref="addFormRef" label-width="100px">
          <el-form-item label="设备类型" prop="systemType">
            <el-select v-model="systemInfo.systemType" placeholder="请选择设备类型">
              <el-option  v-for= "item in systemTypeOption" :key="item.index" :label ="item.label" :value = "item.name" @click = "console.log(item)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称" prop="systemName">
            <el-input v-model="systemInfo.systemName"></el-input>
          </el-form-item>
          <el-form-item label="ip/url" prop="ip">
            <el-input v-model="systemInfo.ip"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDeviceVisible = false">取 消</el-button>
          <el-button type="warning" @click="testIpAndPort(systemInfo)">测试联通</el-button>
          <el-button type="primary" @click="addSystem()">添加设备</el-button>
        </span>
      </el-dialog>
      <el-table :data="device" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="systemName" label="设备名称"> </el-table-column>
        <el-table-column prop="systemType" label="设备类型"> </el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="state" label="状态">
          <!-- <template slot = "scope">
            <el-switch v-model="scope.row.state" @change="systemStateChange(scope.row)">
            </el-switch>
          </template> -->
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 5, 10]"
      :current-page="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      :total = total
      layout="total, sizes, prev, pager, next, jumper"
      >
    </el-pagination>
    </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加设备按钮的对话框
      addDeviceVisible: false,
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },

      device: [{
        systemType: 'hhh',
        ip: 'url',
        systemName: 'hhh',
        port: 0,
        state: 'hhhh'
      }],
      systemTypeOption: [
        { label: '网站爬虫', index: '1', name: '网站' },
        { label: '设备', index: '2', name: '设备' },
        { label: '远程数据库', index: '3', name: '远程数据库' },
        { label: '远程数据文件', index: '4', name: '远程数据文件' }
      ],
      systemInfo: {
        // 添加设备的表单内容
        systemType: '',
        systemName: '',
        ip: ''
      },
      addruleForm: {
        systemName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入ip地址', trigger: 'blur' }
        ],
        systemType: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
    this.getDevicelist()
  },
  methods: {
    async getDevicelist () {
      const { data: res } = await this.$http.get('listSystems')
      if (res.code !== 200) {
        return this.$message.error('获取设备列表失败')
      }
      this.device = res.entity
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getDevicelist()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getDevicelist()
    },
    resetForm () {
      this.$refs.addFormRef.resetFields()
    },
    async systemStateChange (state) {
      this.device.state = state
      console.log(state)
    },
    addSystem () {
      console.log(this.systemInfo)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('addRemoteSystemIsOk', this.systemInfo)
        if (res.code !== 200) return this.$message.error('设备添加失败')
        this.$message.success('设备添加成功')
        this.addDeviceVisible = false
      })
    },
    async testIpAndPort (deviceinfo) {
      console.log(deviceinfo)
      this.addDeviceVisible = false
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
