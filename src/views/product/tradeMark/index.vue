<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0" @click="showDialog">添加</el-button>
    <!-- 
      表格组件 
      data:将来要展示的数据----数组形式
      border:给表格添加边框
      label:标题
      prop:
    -->
    <el-table style="width:100%" border :data="list">
      <!-- 第一列 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <!-- 第二列 -->
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <!-- 第三列 -->
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <!-- 第四列 -->
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- current-page:当前第几页 -->
    <!-- total:数据总条数 -->
    <!-- page-size:一页多少条数据 -->
    <!-- page-sizes:在页面中设置一页多少条数据 -->
    <!-- layout:可以实现分页器布局 -->
    <el-pagination style="margin-top: 20px;text-align: center;" :current-page='page' :total="total"
      :page-sizes="[3,5,10]" :page-size="limit" :page-count="7" layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList" @size-change="sizeChange">
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog :title="this.tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form表单 :model属性 这个属性的作用一是将表单的数据收集到那个对象里 二是将来的表单验证 -->
      <el-form style="width:90%" :model="tmForm" :rules="rules" ref="ruleForm">

        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'tradeMark',
  data() {
    return {
      // 当前第几页
      page: 1,
      // 一页多少条数据
      limit: 3,
      // 一共多少条数据
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框的显示与隐藏
      dialogFormVisible: false,
      // 收集的品牌的信息
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 品牌的表单验证
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌LOGO' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取品牌列表数据的函数
    async getPageList(pager = 1) {
      this.page = pager
      let result = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
      if (result.code === 200) {
        // 修改参数
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 改变一页展示多少条数据
    sizeChange(limit) {
      this.limit = limit
      // 重新发请求
      this.getPageList()
    },
    // 点击添加品牌按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true
      // 清空对话框里的数据
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 修改品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true
      // 浅拷贝
      this.tmForm = { ...row }
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    // 上传图片之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 点击确定按钮
    addOrUpdateTradeMark() {
      // 先进行表单验证
      this.$refs.ruleForm.validate(async (valid) => {
        // 表单验证规则通过
        if (valid) {
          // 隐藏对话框
          this.dialogFormVisible = false
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code == 200) {
            // 弹出信息 添加品牌成功|修改品牌成功
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            })
            // 修改品牌留在当前页 添加品牌去最后一页
            this.getPageList(this.tmForm.id ? this.page : parseInt(this.total / this.limit) + 1)
          }
        } else {
          // 表单验证失败
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除品牌的操作
    deleteTradeMark(row) {
      this.$confirm(`确定要删除${row.tmName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定后触发
        let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>