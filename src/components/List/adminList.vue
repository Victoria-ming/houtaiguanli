<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加按钮</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
            <el-table :data="adminlist" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="用户名字" prop="user_name" ></el-table-column>
                <el-table-column label="注册地址" prop="city" ></el-table-column>
                <el-table-column label="注册时间" prop="create_time" ></el-table-column>
                <el-table-column label="权限" prop="admin" ></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditUser(scope.row.id)">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页列表 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="20"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      queryInfo: {
        query: '',
        limit: 20,
        offset: 0
      },
      adminlist: [],
      total: 0,
      currentPage: 1
    }
  },
  created () {
    this.getCount()
    this.getUserList()
  },
  methods: {
    // 展示用户列表信息
    getUserList: async function () {
      const { data: res } = await this.$http.get('/admin/all', { params: this.queryInfo })
      console.log(res)
      this.adminlist = res.data
    },
    // 获取用户数量信息
    getCount: async function () {
      const { data: countData } = await this.$http.get('/admin/count')
      console.log(countData)
      if (countData.status === 1) {
        this.total = countData.count
      } else {
        return this.$message.error('获取用户总数失败！')
      }
    },
    // 增加用户操作
    addUser: function () {
      this.$router.push('/addUser')
    },
    // 修改操作
    showEditUser: function () {

    },
    // 删除操作
    deleteUser: function () {

    },
    // 分页操作
    handleSizeChange (newPagesize) {
      console.log(newPagesize)
    },
    handleCurrentChange (newPagenum) {
      console.log(newPagenum)
      // this.queryInfo.pagenum = newPagenum
      // this.query.limit = newPagenum
      this.currentPage = newPagenum
      this.queryInfo.offset = (newPagenum - 1) * this.queryInfo.limit
      console.log(this.queryInfo.offset)
      console.log(this.currentPage)

      this.getUserList()
    }
  }

}
</script>
<style lang="less" scoped>
</style>
