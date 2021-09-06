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
        <el-button style="float: right; padding: 3px 0" type="text">下一设备</el-button>
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="station_id"
            label="设备ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="station_name"
            label="设备名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="longtitude"
            label="经度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="laititude"
            label="纬度"
            width="180">
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
      tableData: '',
      zoom: 5,
      center: [44.754326, 120.149444],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        { location: latLng(39.754326, 116.149444), id: 1 },
        { location: latLng(39.754326, 116.149444), id: 2 },
        { location: latLng(48.90424, 125.253778), id: 3 },
        { location: latLng(49.19132, 125.227635), id: 4 }
      ],
      locationList: [
        { locationName: '北京师范大学房山裸地径流小区监测点', id: 1 },
        { locationName: '北京师范大学房山监测点', id: 2 },
        { locationName: '黑龙江省鹤山农场九三水保站', id: 1 },
        { locationName: '黑龙江省嫩江县鹤北径流场17号小区', id: 2 }
      ]
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
  }
}
</script>

<style scoped>

</style>
