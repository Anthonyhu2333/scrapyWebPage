<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>采集设备管理</el-breadcrumb-item>
    <el-breadcrumb-item>数据库同步配置</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-button type = "primary" @click="addScrapyInstance()">新增同步监听实例</el-button>
    <span>|</span>
    <el-button type = "warning" @click = "vedioVisible = true">教学视频</el-button>
    <el-dialog title = "教学视频" :visible.sync= "vedioVisible" width="50%">
      <div>
        <video-player :options="playerOptions"></video-player>
      </div>
    </el-dialog>
    <el-dialog title="添加同步监听实例" :visible.sync="addScrapyInstanceVisible" width="50%" @close="resetScrpayInstanceForm()">
      <el-form :model="scrapyInstanceInfo" :rules="addScrapyruleForm" ref="addScrapyInstanceRef" label-width="100px">
        <el-form-item label="实例名称" prop="additionalInfo">
          <el-input v-model="scrapyInstanceInfo.additionalInfo" ></el-input>
        </el-form-item>
        <el-form-item label ="canal-IP">
          <el-input v-model="scrapyInstanceInfo.serverAddress" ></el-input>
        </el-form-item>
        <el-form-item label ="canal-Port">
          <el-input v-model="scrapyInstanceInfo.port" ></el-input>
        </el-form-item>
         <el-form-item label ="canal-监控队列名称">
          <el-input v-model="scrapyInstanceInfo.destination" ></el-input>
        </el-form-item>
         <el-form-item label ="Kafka-Topic名称">
          <el-input v-model="scrapyInstanceInfo.topic" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addScrapyInstanceVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDBInstanceSubmit()">添加</el-button>
      </span>
    </el-dialog>
    <el-table :data="canals" stripe border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="additionalInfo" label="实例名称"></el-table-column>
      <el-table-column prop="serverAddress" label="canal-Ip"></el-table-column>
      <el-table-column prop="port" label="canal-Port"></el-table-column>
      <el-table-column prop="destination" label="监控队列名称"></el-table-column>
      <el-table-column prop="topic" label="Kafka-Topic"></el-table-column>
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
      canals: '',
      vedioVisible: false,
      addScrapyInstanceVisible: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        controls: true, // 控制条
        preload: 'auto', // 视频预加载
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          src: 'http://localhost:2333/file/video'// 你所放置的视频的地址，最好是放在服务器上
        }],
        // poster: 'http://39.106.117.192:8080/static/indexImg.png', // 你的封面地址（覆盖在视频上面的图片）
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      // 新增爬虫实例表单内的数据
      scrapyInstanceInfo: {
        additionalInfo: '1',
        serverAddress: '2',
        port: '3',
        destination: '4',
        topic: '5'
      },
      addScrapyruleForm: {
        additionalInfo: [
          { required: true, message: '请输入新增同步监听实例名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCanalList()
  },
  methods: {
    async getCanalList () {
      const { data: res } = await this.$http.get('listCanal')
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('数据库同步实例获取失败')
      }
      this.canals = res.entity
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
    addDBInstanceSubmit () {
      this.$refs.addScrapyInstanceRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('addCanal', this.scrapyInstanceInfo)
        if (res.code !== 200) return this.$message.error('同步监听实例添加失败')
        this.$message.success('监听实例添加成功')
        this.getCanalList()
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
