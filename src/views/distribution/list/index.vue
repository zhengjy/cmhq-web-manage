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
          <el-form-item label="姓名">
            <el-input v-model="query.nickname" />
          </el-form-item>
          <el-form-item label="加入时间">
            <date-range-picker v-model="query.createTime" class="date-item" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.delkid">
              <el-option label="拉黑" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
            </el-select>
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
      width="680px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="140px"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.ziMaxNum"></el-input>
        </el-form-item>
        <el-form-item label="可提现佣金" prop="money">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="已提现佣金" prop="tixian">
          <el-input v-model="form.tixian"></el-input>
        </el-form-item>
        <el-form-item label="每天提现次数" prop="ziMaxMoney">
          <el-input v-model="form.ziMaxMoney"></el-input>
        </el-form-item>
        <el-form-item label="每天提现限额" prop="maxWithdrawalNum">
          <el-input
            v-model="form.maxWithdrawalNum"
            style="margin-bottom: 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="每天最大提现金额" prop="maxWithdrawalMoney">
          <el-input
            v-model="form.maxWithdrawalMoney"
            style="margin-bottom: 0"
          ></el-input>
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
      <el-table-column
        :show-overflow-tooltip="true"
        prop="username"
        label="用户名"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="nickname"
        label="姓名"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="money"
        label="可提现佣金"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop=" tixian"
        label="已提现佣金"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="maxWithdrawalMone"
        width="90px"
        label="每天最大提现金额"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="maxWithdrawalNum"
        width="90px"
        label="每天提现次数"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createtime"
        width="120"
        label="加入时间"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="delkid"
        width="90px"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.delkid === 0 ? "未删除" : "已删除" }}
        </template>
      </el-table-column>

      <el-table-column
        v-if="checkPer(['admin', 'company:edit', 'company:del'])"
        label="操作"
        width="170px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="['admin', 'company:edit']"
            size="mini"
            style="margin-right: 3px"
            type="text"
            @click="toEdit(scope.row)"
            >编辑</el-button
          >
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
  nickname: "",
  username: "",
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
  hobbydata: [],
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "fauser/list",
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
    crudJob.getFauserList({ pageNo: 1, pageSize: 1000 }).then((res) => {
      console.log(res);
      this.fauserList = res.data.items;
    });
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
    toEdit(row) {
      this.isEdit = true;
      this.crud.toEdit(row);
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
