<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 订单列表 -->
      <el-table
        :data="orderlist"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.user_name }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单 ID" prop="id"></el-table-column>
        <el-table-column label="总价格" prop="total_amount"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
      </el-table>

      <!-- 分页列表 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
        offset: 0,
        restaurant_id: null
      },
      //   订单列表
      orderlist: [],
      currentRow: null,
      //   总数量
      total: 0,
      //   切换的分页
      currentPage: 1,
      expendRow: []
    }
  },
  created () {
    this.queryInfo.restaurant_id = this.$route.query.restaurant_id
    this.getOrderCount()
  },
  methods: {
    //   获取订单列表信息
    getOrderList: async function () {
      const { data: res } = await this.$http.get('/bos/orders', {
        params: {
          offset: this.queryInfo.offset,
          limit: this.queryInfo.limit,
          restaurant_id: this.restaurant_id
        }
      })
      console.log(res)
      // 将orderlist中的数据进行简单处理一下
      this.orderlist = []
      res.forEach(async (item, index) => {
        const tableData = {}
        tableData.id = item.id
        tableData.total_amount = item.total_amount
        tableData.status = item.status_bar.title
        tableData.user_id = item.user_id
        tableData.restaurant_id = item.restaurant_id
        tableData.address_id = item.address_id
        tableData.index = index
        this.orderlist.push(tableData)
      })
      // this.expand(this.orderlist)
    },
    // TODO:未完成的商品展示页面
    async expand (row, status) {
      console.log(row, status)

      if (status) {
        // 获取商铺的详细信息
        const { data: restaurant } = await this.$http.get(
          '/shopping/restaurants/' + row.restaurant_id
        )
        // 获取用户信息
        const { data: userInfo } = await this.$http.get(
          '/v1/user/' + row.user_id
        )
        console.log(userInfo)

        // 获取地址信息
        const { data: addressInfo } = await this.$http.get(
          '/v1/addresse/' + row.address_id
        )

        this.orderlist.splice(row.index, 1, {
          ...row,
          ...{
            restaurant_name: restaurant.name,
            restaurant_address: restaurant.address,
            address: addressInfo.address,
            user_name: userInfo.username
          }
        })
        this.$nextTick(() => {
          this.expendRow.push(row.index)
        })
      } else {
        const index = this.expendRow.indexOf(row.index)
        this.expendRow.splice(index, 1)
      }
    },

    // 获取订单总数量
    async getOrderCount () {
      const { data: countData } = await this.$http.get('/bos/orders/count')
      console.log(countData)

      if (countData.status === 1) {
        this.total = countData.count
      } else {
        // throw new Error('获取数据失败')
        console.log('获取数据失败')
      }
      this.getOrderList()
    },
    // 分页操作
    handleSizeChange (newPagesize) {
      console.log(newPagesize)
    },
    handleCurrentChange (newPagenum) {
      console.log(newPagenum)
      this.currentPage = newPagenum
      this.queryInfo.offset = (newPagenum - 1) * this.queryInfo.limit
      console.log(this.queryInfo.offset)
      console.log(this.currentPage)

      this.getOrderList()
    }
  }
}
</script>
<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    padding-left: 10px;
    width: 50%;
  }
}

.table_container {
  padding: 20px;
}
</style>
