<template>
  <div class="app-container">
    <div class="head-container">
      <el-form
          :inline="true"
          :model="query"
          class="demo-form-inline"
          label-width="100px"
        >
        <el-form-item label="公司名称：" prop="companyName">
          <el-input v-model="query.companyName"></el-input>
        </el-form-item>
        <el-form-item label="运单号：" prop="billNo">
          <el-input v-model="query.billNo"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="query.type">
            <el-option label="全部" :value="''"></el-option>
            <el-option label="系统" :value="1"></el-option>
            <el-option label="充值" :value="2"></el-option>
            <el-option label="消费" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <rrOperation />
      </el-form>
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
      <el-table-column :show-overflow-tooltip="true" prop="companyName" label="公司名称" />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="billCode"
        label="运单号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="type"
        label="类型"
      >
       <template slot-scope="scope">
             {{ typeMap[scope.row.type] }}
       </template>

      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="msg"
        label="详情"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="before"
        label="变动前余额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="money"
        label="金额"
      >
        <template slot-scope="scope">
          {{  scope.row.addType === 1 ? '+' + scope.row.money : '-' + scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="after"
        width="90px"
        label="当前余额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        width="90px"
        label="时间"
      />
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

};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "companyMoney/list",
      crudMethod: { ...crudJob },
      optShow: {
        add: true,
        edit: false,
        del: false,
        download: true,
        reset: true,
      },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      delLoading: false,
      fauserList: [],
      typeMap: {
        1: '系统',
        2: '充值',
        3: '消费',
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
  mounted() {
    crudJob.getFauserList({pageNo:1, pageSize:1000}).then(res=> {
      console.log(res);
      this.fauserList = res.data.items;
    })
  },
  methods: {
    toEdit(row) {
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
