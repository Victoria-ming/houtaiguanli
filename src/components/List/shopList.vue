<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>商家列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="shoplist" border stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="description"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditShop(scope.row)"
            >编辑</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="addFood(scope.row.id)"
            >添加食品</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row)"
            >删除</el-button>
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
        :total="total"
      ></el-pagination>

      <!-- 修改商铺信息对话框 -->
      <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
           <el-form :model="selectTable">
                    <el-form-item label="店铺名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-input v-model="address.address" auto-complete="off" placeholder="请输入地址" ></el-input>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <!-- <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item> -->
                </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      city: {},
      queryInfo: {
        query: '',
        limit: 20,
        offset: 0
      },
      //   修改对话框的
      dialogFormVisible: false,
      //   对话框中的数据
      selectTable: {},
      //   商品分类中的数据
      categoryOptions: [],
      selectedCategory: [],
      //   地址
      address: {},
      //   商品列表
      shoplist: [],
      //   总数量
      total: 0,
      //   切换的分页
      currentPage: 1
    }
  },
  methods: {
    //   定位商铺的城市
    getCity: async function () {
      const res = await this.$http.get('/v1/cities', {
        params: { type: 'guess' }
      })
      //   获取商铺总的数量
      const { data: countData } = await this.$http.get(
        '/shopping/restaurants/count'
      )
      console.log(res, countData)
      this.city = res.data
      if (countData.status === 1) {
        this.total = countData.count
      } else {
        return this.$message.error('获取商铺总数失败！')
      }
      this.getShopList()
    },
    //   获取商品列表信息
    getShopList: async function () {
      // 获取商铺的经度和纬度
      const { latitude, longitude } = this.city
      console.log(latitude, longitude)
      const { data: res } = await this.$http.get('/shopping/restaurants', {
        params: {
          offset: this.queryInfo.offset,
          limit: this.queryInfo.limit,
          latitude,
          longitude
        }
      })
      console.log(res)
      this.shoplist = res
    },

    // 点击添加商品跳转到添加页面
    addFood: function (id) {
      this.$router.push({ path: 'addGoods', query: { restaurant_id: id } })
    },

    // 编辑修改操作
    showEditShop: function (row) {
      this.selectTable = row
      this.address.address = row.address
      this.dialogFormVisible = true
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

      this.getShopList()
    }
  },
  created () {
    this.getCity()

    console.log(11111)
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
    border: 1px solid #ccc;
  }
}

.table_container {
  padding: 20px;
}
</style>
