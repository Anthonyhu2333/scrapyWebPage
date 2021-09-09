<template>
  <el-container class='home-container'>
    <el-header>
      <div>
        <span>水土保持数据采集系统</span>
      </div>
      <el-button type='info' @click="exit">退出</el-button>
    </el-header>
    <el-container class='asider'>
      <el-aside :width="iscollopse ? '64px':'270px' " height="100%">
        <div class = "toggle-button" @click = "toggle">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened="true" :collapse = "iscollopse" router
        :default-active="activePath">
          <el-submenu v-for = "item in sideBarData" :key = "item.index" :index = "item.index">
             <template slot="title"  @click="console.log(item.index)">
               <i :class="item.icon"></i>
               <span>{{item.name}} </span>
             </template>
             <li v-for = "item1 in item.children" :key = "item1.index">
               <el-submenu v-if = "item1.children.length >0" :index = "item1.index">
                 <template slot="title"  @click="console.log(item.index)">
                   <i :class="item1.icon"></i>
                   <span>{{item1.name}} </span>
                 </template>
                 <li v-for = 'item2 in item1.children' :key = "item2.index">
                   <el-submenu v-if = "item2.children.length >0" :index = "item2.index">
                     <template slot="title">
                       <i :class="item2.icon"></i>
                       <span>{{item2.name}}</span>
                    </template>
                   <el-menu-item v-for = "item3 in item2.children" :key = "item3.index" :index = "item3.index" @click="saveNavState(item2.index)">
                     <i :class="item3.icon"></i>
                     <span>{{item3.name}}</span>
                   </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="item2.children.length ==0" :index = "item2.index">
                   <template>
                     <i :class="item2.icon"></i>
                     <span>{{item2.name}}</span>
                   </template>
                </el-menu-item>
               </li>
               </el-submenu>
               <el-menu-item v-if="item1.children.length ==0" :index = "item1.index">
                  <template>
                     <i :class="item1.icon"></i>
                     <span>{{item1.name}}</span>
                  </template>
                </el-menu-item>
             </li>
          </el-submenu>
        </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iscollopse: false,
      activePath: '',
      // 这个是数据格式
      sideBarData: [

        {
          name: '采集设备管理',
          index: 'menu1',
          icon: 'el-icon-menu',
          children: [
            {
              name: '系统设备',
              index: 'menu1-1',
              icon: 'el-icon-menu',
              children: [
                {
                  name: '设备状态展示',
                  index: '/deviceManger',
                  icon: 'el-icon-menu',
                  children: []
                }
              ]
            },
            {
              name: '网站爬虫',
              index: 'menu1-2',
              icon: 'el-icon-menu',
              children: [
                {
                  name: '设备位置信息展示',
                  index: '/deviceLocation',
                  icon: 'el-icon-menu',
                  children: []
                },
                {
                  name: '网站爬虫信息展示',
                  index: '/websitesManger',
                  icon: 'el-icon-menu',
                  children: []
                },
                {
                  name: '数据入库与告警',
                  index: 'menu1-2-2',
                  icon: 'el-icon-menu',
                  children: [
                    {
                      name: '数据入库',
                      index: '/dataStore',
                      icon: 'el-icon-menu'
                    },
                    {
                      name: '数据告警',
                      index: '/dataAlarm',
                      icon: 'el-icon-menu'
                    }
                  ]
                },
                {
                  name: '爬虫配置',
                  index: '/scrapyconfig',
                  icon: 'el-icon-menu',
                  children: []
                }
              ]
            },
            {
              name: '远程数据库',
              index: 'menu1-3',
              icon: 'el-icon-menu',
              children: [
                {
                  name: '数据入库与告警',
                  index: 'menu1-2-2',
                  icon: 'el-icon-menu',
                  children: [
                    {
                      name: '数据入库',
                      index: '/DBStore',
                      icon: 'el-icon-menu'
                    },
                    {
                      name: '数据告警',
                      index: '/DBAlarm',
                      icon: 'el-icon-menu'
                    }
                  ]
                },
                {
                  name: '数据库同步配置',
                  index: '/DBconfig',
                  icon: 'el-icon-menu',
                  children: []
                }
              ]
            },
            {
              name: '远程数据文件',
              index: 'menu1-4',
              icon: 'el-icon-menu',
              children: []
            },
            {
              name: '文件上传下载',
              index: '/fileUploadAndDownload',
              icon: 'el-icon-menu',
              children: []
            }
          ]
        },
        {
          name: '采集数据管理',
          index: 'menu2',
          icon: 'el-icon-menu',
          children: [
            {
              name: '数据统计',
              index: '/Statistic',
              icon: 'el-icon-menu',
              children: []
            },
            {
              name: '数据查询',
              index: '/DataCharts',
              icon: 'el-icon-menu',
              children: []
            },
            {
              name: '消息查询',
              index: '/MessageTable',
              icon: 'el-icon-menu',
              children: []
            },
            {
              name: '数据校验规则设置',
              index: '/DataCheck',
              icon: 'el-icon-menu',
              children: []
            }
          ]
        }
      ]
    }
  },
  methods: {
    exit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggle () {
      // 点击按钮实现菜单的折叠和展开
      this.iscollopse = !this.iscollopse
    },
    saveNavState (activePath) {
      // 保存链接的激活状态
      this.activePath = activePath
    }

  }
}
</script>
<style scoped>
    .el-container {
        height: 100%;
    }

    .el-header {
        display: flex;
        justify-content: space-between;
        background-color: #373D41;
        padding-left: 0;
        align-items: center;
        color: white;
        font-size: 20px;
    }

    .el-header div {
        display: flex;
        align-items: center;
    }

    .el-header div span {
        margin-left: 15px;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-main {
        background-color: #eaedf1;
    }
    .toggle-button{
      background-color: #4A5064;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
</style>
