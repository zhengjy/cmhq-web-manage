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
        <el-form-item label="用户名">
            <el-input v-model="query.username" />
          </el-form-item>
          <el-form-item label="运单号">
            <el-input v-model="query.billCode" />
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="query.orderNo" />
          </el-form-item>
          <el-form-item label="公司">
            <el-input v-model="query.companyName" />
          </el-form-item>
          <rrOperation />
        </el-form>
      </div>
      <crudOperation />
    </div>

    <!--表格渲染-->
    <el-table
      ref="table"
      fit
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
      border
    >
      <!-- <el-table-column :selectable="checkboxT" type="selection" width="55" /> -->
      <el-table-column :show-overflow-tooltip="true" prop="id" label="Id" />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="userName"
        label="用户"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="billCode"
        label="运单号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="msg"
        label="详情"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="before"
        width="170"
        label="变动前余额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="money"
        label="金额"
      />

      <el-table-column
        :show-overflow-tooltip="true"
        prop="after"
        width="90px"
        label="当前余额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orderNo"
        width="150"
        label="订单号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="money"
        width="90px"
        label="剩余金额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="companyName"
        width="150"
        label="公司"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        width="150"
        label="添加时间"
      />
      <el-table-column
        v-if="checkPer(['admin', 'company:edit', 'company:del'])"
        label="操作"
        width="170px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-popover
            :ref="scope.row.id"
            v-permission="['admin', 'company:del']"
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
import crudJob from "@/api/company/index";
const defaultForm = {
  companyName: "",
  mobile: "",
  password: "",
  fUser: "",
  distributionRatio: "",
  cancelMaxNum: "",
  cancelMaxMoney: "",
  checkWeightNum: "",
  checkWeightType: "",
  checkWeightRatio: "",
  ratio: "",
  createTime: "",
  hobbydata: []
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "company/list",
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
  mounted() {
    crudJob.getFauserList({pageNo:1, pageSize:1000}).then(res=> {
      console.log(res);
      this.fauserList = res.data.items;
    })
  },
  methods: {
    toEdit(row) {
      this.isEdit = true;
      this.crud.toEdit(row)
      this.form.hobbydata = JSON.parse(row.hobbydata);
      this.form.id = row.id;
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
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
  },
};
</script>
