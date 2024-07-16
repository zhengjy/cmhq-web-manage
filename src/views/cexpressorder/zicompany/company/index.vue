<template>
  <div class="app-container">
    <div class="head-container">
      <crudOperation/>
    </div>
    <!--Form表单-->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      append-to-body
      width="730px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="140px"
      >
        <el-form-item label="名字：" prop="nickName">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="子账号一天最大单量：" prop="ziMaxNum">
          <el-input v-model="form.ziMaxNum"></el-input>
        </el-form-item>
        <el-form-item label="子账号每日最大订单金额：" prop="ziMaxMoney">
          <el-input v-model="form.ziMaxMoney"></el-input>
        </el-form-item>
        <el-form-item label="子账号单笔订单最大限制金额：" prop="ziOneMaxMoney">
          <el-input v-model="form.ziOneMaxMoney"></el-input>
        </el-form-item>
        <el-form-item label="最多取消订单次数：" prop="cancelMaxNum">
          <el-input v-model="form.cancelMaxNum"></el-input>
        </el-form-item>
        <el-form-item label="单笔取消订单金额上限：" prop="cancelMaxMoney">
          <el-input v-model="form.cancelMaxMoney"></el-input>
        </el-form-item>
        <el-form-item label="检验下单重量和结算重量百分比：" prop="checkWeightRatio">
            <el-input v-model="form.checkWeightRatio"><div slot="suffix">%</div></el-input>
          </el-form-item>
          <el-form-item label="检验下单重量和结算重量类型：" prop="checkWeightType">
           <el-select v-model="form.checkWeightType">
              <el-option label="日" value="day"></el-option>
              <el-option label="周" value="week"></el-option>
              <el-option label="月" value="month"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检验下单重量和结算重量周期次数：" prop="checkWeightNum">
            <el-input v-model="form.checkWeightNum"></el-input>
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
      <el-table-column :show-overflow-tooltip="true" prop="id" label="Id" />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="nickName"
        label="名字"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="phone"
        label="手机号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="password"
        label="密码"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ziMaxNum"
        label="子账号一天最大单量"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ziOneMaxMoney"
        label="子账号单笔订单最大限制金额"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.childUser.ziOneMaxMoney }}</span>
      </template>
    </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ziMaxMoney"
        width="90px"
        label="子账号每日最大订单金额"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.childUser.ziMaxMoney }}</span>
      </template>
    </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cancelMaxMoney"
        width="90px"
        label="单笔取消订单金额上限"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.childUser.ziMaxMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cancelMaxNum"
        width="90px"
        label="最多取消订单次数"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.childUser.cancelMaxNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cancelMaxMoney"
        width="90px"
        label="单笔取消订单金额上限"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.childUser.cancelMaxMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="checkWeightRatio"
        width="90px"
        label="检验下单重量和结算重量百分比"
      >
      <template slot-scope="scope">
          <span>{{ scope.row.childUser.checkWeightRatio }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="checkWeightType"
        width="90px"
        label="检验下单重量和结算重量类型"
      >
       <template slot-scope="scope">
        {{ scope.row.checkWeightType === 'week' ? '周' :  scope.row.checkWeightType === 'mouth' ? '月' : '日' }}
       </template>
    </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="checkWeightNum"
        width="90px"
        label="检验下单重量和结算重量周期次数"
      >
      <template slot-scope="scope">
          <span>{{ scope.row.childUser.checkWeightNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        width="90px"
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
import crudJob from "@/api/company/index";
const defaultForm = {
  nickName: "",
  phone: "",
  password: "",
  ziMaxNum: "",
  ziMaxMoney: "",
  ziOneMaxMoney: "",
  cancelMaxNum: "",
  cancelMaxMoney: "",
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
