<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    // 判断是否为柱状图或折线图
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    // 图表数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        }
      },
    },
  },
  data() {
    return {
      // 折线图/柱状图配置
      axisOptions: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
        ],
        series: [],
      },
      // 饼状图配置
      normalOption: {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [],
      },
      echart: null,
    }
  },
  computed: {
    // 通过判断图的类型,返回对应配置数据
    options() {
      return this.isAxisChart ? this.axisOptions : this.normalOption
    },
  },
  watch: {
    // 监听图表数据的变化,数据改变重新渲染图表
    chartData: {
      handler: function () {
        // 初始化图表
        this.initCahrt()
      },
      // 监听对象是一个对象,需要深度监听其内部属性的变化
      deep: true,
    },
  },
  methods: {
    // 初始化图表
    initCahrt() {
      // 为图表赋值
      if (this.isAxisChart) {
        this.axisOptions.xAxis.data = this.chartData.xData
        this.axisOptions.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
  },
}
</script>

<style></style>
