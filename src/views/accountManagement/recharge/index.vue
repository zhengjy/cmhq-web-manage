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
          <el-form-item label="公司名称">
            <el-input v-model="query.companyName" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.status">
              <el-option label="全部" value=""></el-option>
              <el-option label="未支付" :value="0"></el-option>
              <el-option label="已支付" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加时间：">
            <date-range-picker v-model="query.createTime" class="date-item" />
        </el-form-item>
          <el-form-item label="支付开始时间">
          <el-date-picker v-model="query.playSTime" class="date-item" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
          </el-form-item>
          <el-form-item label="支付时间">
          <el-date-picker v-model="query.playETime" class="date-item" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <rrOperation />
        </el-form>
      </div>
      <!-- <crudOperation :permission="permission" /> -->
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
     fit
      v-loading="crud.loading"
      :data="crud.data"
      border
      style="width: 100%"
    >
      <!-- <el-table-column :selectable="checkboxT" type="selection" width="55" /> -->
      <el-table-column :show-overflow-tooltip="true" prop="companyName" label="公司名称" />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orderid"
        label="订单号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="money"
        label="冲值钱数"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="status"
        label="状态"
      >
      <template slot-scope="scope">
      {{ scope.row.status == 0 ? '未支付' : '已支付' }}
      </template>
    </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="updateTime"
        label="支付时间"
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
import crudJob from "@/api/cexpressorder/zipay";
const defaultForm = {

};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "充值记录",
      url: "/fcRecharge/list",
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
      permission: {
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
    [CRUD.HOOK.beforeRefresh]() {
      if (this.query.createTime) {
        this.query.sTime = this.query.createTime[0];
        this.query.eTime = this.query.createTime[1];
      } else {
        this.query.eTime = undefined;
        this.query.sTime = undefined;
      }
    },
  },
};
</script>
