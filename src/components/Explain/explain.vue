<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>说明</el-breadcrumb-item>
      <el-breadcrumb-item>说明列表</el-breadcrumb-item>
    </el-breadcrumb>
    <p class="explain_text">node-elm后台管理系统</p>
    <p class="explain_text">说明列表，这个后台管理系统是一个简单设计的管理系统，功能可以进行简单使用</p>
    <p class="explain_text">主要功能有数据管理、添加数据、图表、编辑、设置（只有简单的展示功能）等功能</p>
    <p class="explain_text">整个管理系统多为进行数据的展示</p>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
</style>
