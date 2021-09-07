<template>
  <div>
    <div style="height: 500px;background: aliceblue" id="main">
      <l-map
        v-bind:zoom=zoom
        :center="center"
        style="height: 500px; width: 100%"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker v-for="marker in markers" :key="marker.id"
                  :lat-lng="marker.location" @click="markerclick(marker.id)" />
      </l-map>
    </div>
    <el-card class="box-card" style="margin-top: 30px; background: aliceblue">
      <div slot="header" class="clearfix">
        <span>设备详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="nextClick">下一设备</el-button>
      </div>
      <template>
        <el-table
          :data="tableData"
          :key="Math.random()"
          style="width: 100%">
          <el-table-column
            prop="station_id"
            label="设备ID"
            width="240">
          </el-table-column>
          <el-table-column
            prop="station_name"
            label="设备名称"
            width="320">
          </el-table-column>
          <el-table-column
            prop="longtitude"
            label="经度"
            width="240">
          </el-table-column>
          <el-table-column
            prop="laititude"
            label="纬度"
            width="240">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const iconRetinaUrlText = require('leaflet/dist/images/marker-icon-2x.png')
const iconUrlText = require('leaflet/dist/images/marker-icon.png')
const shadowUrlText = require('leaflet/dist/images/marker-shadow.png')

export default {
  name: 'DeviceLocation',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      currentID: 1,
      data: [],
      tableData: [
        { station_id: '', station_name: '', longtitude: '', laititude: '' }
      ],
      zoom: 5,
      center: [44.754326, 120.149444],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        // { location: latLng(39.754326, 116.149444), id: 1 },
        // { location: latLng(39.754326, 116.149444), id: 2 },
        // { location: latLng(48.90424, 125.253778), id: 3 },
        // { location: latLng(49.19132, 125.227635), id: 4 }
      ]
    }
  },
  methods: {
    nextClick () {
      let i = 0
      i = (this.currentID + 1) % this.data.length
      this.tableData = []
      this.tableData.push({ station_id: this.data[i].id, station_name: this.data[i].name, longtitude: this.data[i].longitude, laititude: this.data[i].latitude })
      this.currentID = i
    },
    markerclick (e) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === e) {
          this.tableData = []
          this.tableData.push({ station_id: this.data[i].id, station_name: this.data[i].name, longtitude: this.data[i].longitude, laititude: this.data[i].latitude })
          this.currentID = i
        }
      }
    },
    getMessage () {
      var countValue = 0
      var offsetValue = 4
      const path = 'http://localhost:9999/data_demon/listStationDetails?count=' + countValue + '&offset=' + offsetValue
      axios.get(path)
        .then((res) => {
          this.data = res.data
          console.log(this.data)
          this.markers = []
          this.locationList = []
          for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i].latitude)
            this.markers.push({ location: latLng(this.data[i].latitude, this.data[i].longitude), id: this.data[i].id })
          }
          console.log(this.markers)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    }
  },
  created () {
    delete Icon.Default.prototype._getIconUrl
    Icon.Default.imagePath = '.'
    Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrlText,
      iconUrl: iconUrlText,
      shadowUrl: shadowUrlText
    })
    this.getMessage()
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
