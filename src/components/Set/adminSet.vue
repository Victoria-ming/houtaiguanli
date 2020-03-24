<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 展示操作 -->
    <header class="admin_title">管理员信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span>姓名：</span>
          <span></span>
        </li>
        <li>
          <span>注册时间：</span>
          <span></span>
        </li>
        <li>
          <span>管理员权限：</span>
          <span></span>
        </li>
        <li>
          <span>管理员 ID：</span>
          <span></span>
        </li>
        <li style="color:red">说明：管理员角色的api文档缺失，只有布局样式</li>
      </ul>
    </div>
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
.admin_set {
  width: 60%;
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;
  ul > li {
    padding: 20px;
    list-style: none;
    span {
      color: #666;
    }
  }
}
.admin_title {
  margin-top: 20px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
