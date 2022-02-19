<template>
  <el-row class="home-content" :gutter="20">
    <!-- 左侧部分 -->
    <el-col :span="8">
      <!-- 个人信息部分 -->
      <el-card class="home-info">
        <div class="user-infoBox">
          <img :src="imgSrc" class="image" />
          <div class="user-info">
            <p>Oscar</p>
            <span>超级管理员</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="user-loginInfo">
          <el-descriptions class="margin-top" title="" :column="1">
            <el-descriptions-item label="上次登录时间"
              >2021-02-18</el-descriptions-item
            >
            <el-descriptions-item label="上次登录地点">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
      <!-- 表格部分 -->
      <el-card class="data-card">
        <el-table height="340" :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="(item, index) in tableTab"
            :key="index"
            :prop="index"
            :label="item"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧部分 -->
    <el-col :span="16">
      <div class="home-other">
        <div class="num">
          <el-card
            class="box-card"
            v-for="item in countData"
            :key="item.name"
            shadow="always"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="num-other">
              <p>￥{{ item.value }}</p>
              <span>￥{{ item.name }}</span>
            </div>
          </el-card>
        </div>
        <el-card style="height: 250px">
          <ECharts
            :isAxisChart="true"
            :chartData="this.echartData.order"
            style="height: 250px"
          ></ECharts>
        </el-card>
        <div class="chart-box">
          <div class="chart-bar">
            <ECharts
              :isAxisChart="true"
              :chartData="this.echartData.user"
              style="height: 200px"
            ></ECharts>
          </div>
          <div class="chart-pie">
            <ECharts
              :isAxisChart="false"
              :chartData="this.echartData.video"
              style="height: 200px"
            ></ECharts>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../../api/data'
// import * as echarts from 'echarts'
import ECharts from '../../components/ECharts.vue'
export default {
  name: 'home',
  components: {
    ECharts,
  },
  data() {
    return {
      // 头像url
      imgSrc: require('../../assets/images/user.png'),
      loginTime: new Date(),
      tableTab: {
        name: '课程',
        todayBuy: '今日购买',
        totalBuy: '总购买',
        monthBuy: '本月购买',
      },
      tableData: [],
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
      // 图表数据
      echartData: {
        // 折线
        order: {
          xData: [],
          series: [],
        },
        // 柱状
        user: {
          xData: [],
          series: [],
        },
        // 扇形
        video: {
          series: [],
        },
      },
    }
  },
  created() {
    // 获取后台首页数据
    this.getHomeData()
  },
  methods: {
    // 获取首页数据
    getHomeData() {
      getData().then((res) => {
        const { code, data } = res.data
        if (code === 20000) {
          this.tableData = data.tableData
          // 调用创造折线图方法
          this.doLine(data.orderData)
          // 调用创造柱状图方法
          this.doBar(data.userData)
          // 调用创造饼图方法
          this.doPie(data.videoData)
        }
      })
    },
    // 创造折线图数据
    doLine(order) {
      const xData = order.date
      // 返回折线图可枚举的属性数组
      const keyArray = Object.keys(order.data[0])
      // 创建图例对应的数据
      const series = []
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: 'line',
        })
      })
      this.echartData.order.xData = xData
      this.echartData.order.series = series
    },
    // 创造柱状图
    doBar(order) {
      this.echartData.user.xData = order.map((item) => item.date)
      this.echartData.user.series = [
        {
          name: '新增用户',
          data: order.map((item) => item.new),
          type: 'bar',
        },
        {
          name: '活跃用户',
          data: order.map((item) => item.active),
          type: 'bar',
        },
      ]
    },
    // 创造饼图
    doPie(order) {
      this.echartData.video.series = [
        {
          type: 'pie',
          data: order,
          // 将饼图设计为南丁格尔图(玫瑰图)
          roseType: 'area',
        },
      ]
    },
  },
}
</script>

<style lang="less" scoped>
.home-content {
  .home-info {
    .user-infoBox {
      display: flex;

      .image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 2em;
        p {
          font-size: 2em;
          margin-bottom: 0.3em;
        }
        span {
          font-size: 1em;
          color: #999;
        }
      }
    }
  }
  .data-card {
    margin-top: 1em;
  }
  .home-other {
    .box-card {
      background-color: #fff;
      i {
        padding: 1em;
        font-size: 1.5em;
        color: #fff;
      }
      .num-other {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        p {
          font-size: 1.8em;
        }
        span {
          margin-top: 5px;
          font-size: 0.8em;
          color: #888;
        }
      }
    }
    .chart-box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .chart-bar {
        flex: 1;
        background-color: #fff;
        box-shadow: 0 0 10px #ddd;
        width: 100%;
      }
      .chart-pie {
        flex: 1;
        background-color: #fff;
        box-shadow: 0 0 10px #ddd;
        width: 95%;
        margin-left: 5%;
      }
    }
  }
}
</style>
