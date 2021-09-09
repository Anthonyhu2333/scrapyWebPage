<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" style="height: 300px;background: aliceblue;margin-right: 25px;margin-left: 25px">
          <div style="height: 15px"></div>
          <div style="text-align: center">数据格式设置</div>
          <el-select v-model="value1" placeholder="请选择数据源" style="margin-top: 40px;margin-right: 5px;margin-left: 10%">
            <el-option
              v-for="item in option1"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" placeholder="请选择表项" style="margin-top: 30px;margin-right: 5px;margin-left: 10%">
            <el-option
              v-for="item in option2"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button style="margin-left: 80px;margin-top: 30px" @click="getData(value1,value2)">查询</el-button>
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
              <el-button @click="open(value2,cards)" style="margin-top: 20px;margin-left: 100px">确认修改</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataCheck',
  data () {
    return {
      value1: [],
      option1: [],
      value2: [],
      option2: [],
      optionSelection: [
        'riverFlow',
        'riverFlowPerTest',
        'sandContent',
        'sandPerTest',
        'sandAmount',
        'temperature',
        'humidity',
        'rainfall',
        'sedimentMeasuringNumber',
        'runoffGenerationVolume',
        'sedimentAmount',
        'sedimentLostAmount',
        'rainfall',
        'runoffWeight',
        'runoffDensity'
      ],
      input: '',
      cards: [
        // { name: '数组最大值', id: 1, content: '' },
        // { name: '数据最小值', id: 2, content: '' },
        // { name: '数据能否为空', id: 3, content: '' }
      ]
    }
  },
  watch: {
    // 对第一排下拉框的点击事件做出响应
    value1: function () {
      let recordId = 0
      recordId = this.getRecordId(this.value1)
      console.log(recordId)
      this.value2 = []
      const path1 = 'http://localhost:8080/data_demon/getRecordIndex'
      axios.get(path1, {
        params: {
          recordId: recordId
        }
      })
        .then((res) => {
          this.option2 = []
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data)
            if (this.optionSelection.indexOf(res.data[i].tableFieldName) !== -1) {
              console.log(res.data[i])
              this.option2.push({ id: res.data[i].id, label: res.data[i].tableFieldNameZh, value: res.data[i].id })
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    value2: function () {

    }
  },
  methods: {
    getData (deviceID, tableFieldId) {
      const tabelId = this.getRecordId(deviceID)
      const path = 'http://localhost:8080/data_demon/getRecordIndex'
      axios.get(path, {
        params: {
          recordId: tabelId
        }
      })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].id === tableFieldId) {
              var json = JSON.parse(res.data[i].regulation)
              this.cards = []
              var count = 1
              for (var j in json) {
                this.cards.push({ name: j, id: count, content: json[j] })
              }
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    getRecordId (id) {
      if (id < 10) return 4
      if (id > 10000) return 3
      if (id > 4000) return 2
      return 1
    },
    getMessage () {
      const path = 'http://localhost:8080/data_demon/listStationList'
      axios.get(path)
        .then((res) => {
          this.option1 = []
          for (let i = 0; i < res.data.length; i++) {
            this.option1.push({ id: res.data[i].deviceId, label: res.data[i].name, value: res.data[i].deviceId })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    open (id, regulation) {
      var json = {}
      for (var i in this.cards) {
        json[this.cards[i].name] = this.cards[i].content
      }
      regulation = JSON.stringify(json)
      console.log(regulation)
      const path = 'http://localhost:8080/data_demon/updateRecordIndex'
      axios.get(path, {
        params: {
          id: id,
          regulation: regulation
        }
      })
        .then((res) => {
          console.log('数据发送成功')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
      this.$alert('修改成功', '提示', {
        confirmButtonText: '确定'
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${action}`
        //   })
        // }
      })
    }
  },
  created () {
    this.getMessage()
  }
}
</script>

<style scoped>

</style>
