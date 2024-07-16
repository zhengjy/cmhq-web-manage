<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-form
          :inline="true"
          :model="query"
          class="demo-form-inline"
          label-width="70px"
        >
          <el-form-item label="名称">
            <el-input v-model="query.searchTxt" />
          </el-form-item>
          <rrOperation />
        </el-form>
      </div>
      <crudOperation />
    </div>
    <!--Form表单-->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      append-to-body
      width="760px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="240px"
      >
        <el-form-item label="商品名称：" prop="categoryName">
          <el-input v-model="form.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="重量(kg)：" prop="weight">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="长(cm)：" prop="length">
          <el-input v-model="form.length"></el-input>
        </el-form-item>
        <el-form-item label="宽(cm)：" prop="width">
          <el-input v-model="form.width"></el-input>
        </el-form-item>
        <el-form-item label="高(cm)：" prop="height">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button
            :loading="crud.status.cu === 2"
            type="primary"
            @click="crud.submitCU"
            >确认</el-button
          >
        </div>
    </el-dialog>
    <div class="btn-warp">
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleChange"
      :headers="myHeaders"
      >
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>
    &nbsp;&nbsp;&nbsp;
    <el-button size="small" type="primary">
      <a href="http://120.76.156.209:8000/file/文档/产品导入模板-2024061409222225.xlsx" target="_blank">
        下载模板
      </a>
    </el-button>
    </div>
    <br/>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
      border
    >
      <!-- <el-table-column :selectable="checkboxT" type="selection" width="55" /> -->
      <el-table-column
        prop="categoryName"
        label="商品名字"
      />
      
      <el-table-column
        prop="categoreCode"
        label="商品编码"
      />
      <el-table-column
        prop="weight"
        label="重量(kg)"
      />
      <el-table-column
        prop="length"
        label="长(cm)"
      />
      <el-table-column
        prop="width"
        label="宽(cm)"
      />
      <el-table-column
        prop="height"
        label="高(cm)"
      />
      
      <el-table-column
        label="操作"
        width="170px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right: 3px"
            type="text"
            @click="toEdit(scope.row)"
            >编辑</el-button
          >
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="200"
          >
            <p>确定吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.id].doClose()"
                >取消</el-button
              >
              <el-button
                :loading="delLoading"
                type="primary"
                size="mini"
                @click="delMethod(scope.row.id)"
                >确定</el-button
              >
            </div>
            <el-button slot="reference" type="text" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import pagination from "@crud/Pagination";
import DateRangePicker from "@/components/DateRangePicker";
import crudOperation from "@crud/CRUD.operation";
import crudJob from "@/api/cexpressorder/category/index";
import { getToken } from '@/utils/auth';

const defaultForm = {
  categoryName: "",
  weight: "",
  length: "",
  width: "",
  height: "",
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "product/list",
      crudMethod: { ...crudJob },
      optShow: {
        add: true,
        edit: false,
        del: false,
        download: false,
        reset: true,
      },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      delLoading: false,
      fauserList: [],
      uploadUrl: process.env.VUE_APP_BASE_API + "/product/uploadExcel",
      myHeaders: {
        Authorization: getToken()
      },
      permission: {
        // add: ["admin", "company:add"],
        // edit: ["admin", "company:edit"],
        // del: ["admin", "company:del"],
      },
      rules: {
        // jobName: [
        //   { required: true, message: "请输入任务名称", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    toEdit(row) {
      this.isEdit = true;
      this.crud.toEdit(row)
      this.form.id = row.id;
    },
    handleChange(file, fileList) {
      console.error(file, fileList);
      this.$notify({
        title: '上传成功！',
        type: 'success',
        duration: 1500
      });
      this.crud.toQuery();
    },
    // 改变状态
    delMethod(id) {
      this.delLoading = true;
      crudJob
        .del([id])
        .then(() => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.crud.dleChangePage(1);
          this.crud.delSuccessNotify();
          this.crud.toQuery();
        })
        .catch(() => {
          this.delLoading = false;
          this.$refs[id].doClose();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-warp {
  padding-bottom: 10px;
  display: inline-flex;
}
</style>