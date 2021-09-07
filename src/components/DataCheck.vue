<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" style="height: 300px;background: aliceblue;margin-right: 25px;margin-left: 25px">
          <div style="height: 15px"></div>
          <div style="text-align: center">数据格式设置</div>
          <el-select v-model="value" placeholder="请选择数据源" style="margin-top: 70px;margin-right: 5px;margin-left: 10%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择表项" style="margin-top: 30px;margin-right: 5px;margin-left: 10%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card :body-style="{ padding: '0px' }">
          <div style="height: 300px;background: aliceblue">
            <el-row v-for="card in cards" :key="card.id">
              <el-col :span="8" style="text-align: center;margin-top: 30px">
                {{card.name}}
              </el-col>
              <el-col :span="14">
                <el-input :placeholder=card.name v-model="card.content" style="margin-top: 20px"></el-input>
              </el-col>
            </el-row>
            <div style="align-content: center">
              <el-button @click="open" style="margin-top: 20px;margin-left: 100px">确认修改</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataCheck',
  data () {
    return {
      input: '',
      cards: [
        { name: '数组最大值', id: 1, content: '' },
        { name: '数据最小值', id: 2, content: '' },
        { name: '数据能否为空', id: 3, content: '' }
      ]
    }
  },
  methods: {
    open () {
      this.$alert('修改成功', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
