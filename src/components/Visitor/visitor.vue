<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图表</el-breadcrumb-item>
      <el-breadcrumb-item>用户分布</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
// import _ from 'lodash'
// 引入柱状图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  data: function () {
    return {
      pieData: {}

    }
  },
  methods: {
    //   echarts的柱形图
    initData () {
      const option = {
        title: {
          text: '用户分布',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京', '上海', '深圳', '杭州', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.pieData.beijing, name: '北京' },
              { value: this.pieData.shanghai, name: '上海' },
              { value: this.pieData.shenzhen, name: '深圳' },
              { value: this.pieData.hangzhou, name: '杭州' },
              { value: this.pieData.qita, name: '其他' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      this.myChart.setOption(option)
    },
    // 获取图形数据
    async getCount () {
      const { data: res } = await this.$http.get('/v1/user/city/count')
      console.log(res)

      if (res.status !== 1) {
        return this.$message.error('获取折线图数据失败！')
      } else {
        this.pieData = res.user_city
      }
    }
  },
  created () {

  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById('main'))
    this.getCount()
    this.initData()
  },
  watch: {
    pieData: function () {
      this.initData()
    }
  }
}

</script>
<style lang="less" scoped>
</style>
