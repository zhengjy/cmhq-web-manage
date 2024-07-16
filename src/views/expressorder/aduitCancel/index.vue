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
          label-width="120px"
        >
          <el-form-item label="账户名称">
            <el-input v-model="query.userName" />
          </el-form-item>

          <el-form-item label="添加时间：">
            <date-range-picker v-model="query.createTime" class="date-item" />
        </el-form-item>
        <el-table-column
        :show-overflow-tooltip="true"
        prop="courierCompanyCode"
        label="快递公司"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="courierCompanyWaybillNo"
        label="运单号"
      />
          <el-form-item label="物品名称">
            <el-input v-model="query.goodsName" />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="query.orderState" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="待取件" :value="0"></el-option>
              <el-option label="调派" :value="1"></el-option>
              <el-option label="已取件" :value="2"></el-option>
              <el-option label="已取消" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流状态">
            <el-select v-model="query.wuliuState" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="运输中" :value="1"></el-option>
              <el-option label="派件中" :value="2"></el-option>
              <el-option label="已签收" :value="3"></el-option>
              <el-option label="异常" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="订单取消状态">
            <el-select v-model="query.cancelOrderState" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="待审核" :value="-1"></el-option>
              <el-option label="取消待审核" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="审核通过" :value="2"></el-option>
              <el-option label="审核不通过" :value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="是否异常">
            <el-select v-model="query.orderIsError" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="异常" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="否结算">
            <el-select v-model="query.isJiesuan" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="未结算" :value="0"></el-option>
              <el-option label="已结算" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发件人姓名">
            <el-input v-model="query.fromName" />
          </el-form-item>
          <el-form-item label="发件人电话">
            <el-input v-model="query.fromMobile" />
          </el-form-item>
          <el-form-item label="收件人姓名">
            <el-input v-model="query.toName" />
          </el-form-item>
          <el-form-item label="收件人电话">
            <el-input v-model="query.toMobile" />
          </el-form-item>
          <el-form-item label="公司">
            <el-input v-model="query.companyName" />
          </el-form-item>
          <rrOperation />
        </el-form>
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--Form表单-->
    <!-- <el-dialog
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
        <el-form-item label="当前订单状态：" prop="orderState">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              style="width: 400px"
            ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button
            :loading="crud.status.cu === 2"
            type="primary"
            @click=""
            >确认</el-button
          >
        </div>
    </el-dialog> -->
    <!--表格渲染-->
    <el-table
      ref="table"
      fit
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
      border
    >
    <el-table-column
        :show-overflow-tooltip="true"
        prop="createUserName"
        label="账户名称"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
        width="150"
      />

      <el-table-column
        :show-overflow-tooltip="true"
        prop="courierCompanyCode"
        label="快递公司"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="courierCompanyWaybillNo"
        label="运单号"
        width="150"
      />

      <el-table-column
        :show-overflow-tooltip="true"
        prop="goodsName"
        label="物品名称"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="weight"
        label="预估重量"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="estimatePrice"
        label="预估费用"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="weightto"
        label="实际重量"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="price"
        label="实际费用"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="quantity"
        label="包裹数"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cancelOrderStat"
        label="订单状态"
      >
      <template slot-scope="scope">
        <span>{{orderState[scope.row.orderState] }}</span>
      </template>
    </el-table-column>
    <el-table-column
        :show-overflow-tooltip="true"
        prop="wuliuState"
        label="物流状态"
      >
      <template slot-scope="scope">
      <span>{{wuliuState[scope.row.wuliuState] }}</span>
      </template>
    </el-table-column>
    <el-table-column
        :show-overflow-tooltip="true"
        prop="orderState"
        label="订单取消状态"
      >
      <template slot-scope="scope">
      <span>{{cancelOrderState[scope.row.cancelOrderState] }}</span>
      </template>
    </el-table-column>
    <el-table-column
        :show-overflow-tooltip="true"
        prop="reason"
        label="取消原因"
        width="200"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orderState"
        label="是否异常"
      >
      <template slot-scope="scope">
      <span>{{orderIsError[scope.row.orderIsError] }}</span>
      </template>
    </el-table-column>
       <el-table-column
        :show-overflow-tooltip="true"
        prop="reason"
        label="异常原因"
      >
      <template slot-scope="scope">
            <span>{{ scope.row.courierOrderExtend && scope.row.courierOrderExtend.orderIsErrorMsg }}</span>

      </template>
     </el-table-column>
     <el-table-column
        :show-overflow-tooltip="true"
        prop="orderState"
        label="是否结算"
      >
      <template slot-scope="scope">
      <span>{{ isJiesuan[scope.row.isJiesuan] }}</span>
      </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="msg"
        label="备注"
        width="200"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="fromName"
        label="发货人姓名"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="fromMobile"
        label="发货人电话"
        width="150"
      />

      <el-table-column
        :show-overflow-tooltip="true"
        prop="fromAddress"
        label="发货地址"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toName"
        label="收货人姓名"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toMobile"
        label="收货人电话"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="toAddress"
        label="收货地址"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="companyName"
        label="公司"
        width="150"
      />
      <el-table-column
        label="操作"
        width="170px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-popover
            :ref="scope.row.id + 'ok'"
            placement="top"
            width="200"
          >
            <p>审核通过？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id + 'ok'].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="toEdit(scope.row, 'auditSuccess')">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="mini">审核通过</el-button>
          </el-popover>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="200"
          >
            <p>审核不通过？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="toEdit(scope.row, 'auditFail')">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="mini">审核不通过</el-button>
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
import crudJob from "@/api/cexpressorder/ziorder/tocancel.js";
const defaultForm = {
  // [-1]
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "订单反馈",
      url: "/courierOrder/list",
      crudMethod: { ...crudJob },
      optShow: {
        add: false,
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
      currentOrderState: '',
      currentId: '',
      permission: {
        // add: ["admin", "company:add"],
        // edit: ["admin", "company:edit"],
        // del: ["admin", "company:del"],
      },
       // 1运输中2派件中3已签收4异常
       wuliuState: {
        1: "运输中",
        2: "派件中",
        3: "已签收",
        4: "异常",
      },
      // "订单状态：极兔（0待取件1已取件2已发出3已签收）")
      orderState: {
        0:'待取件',
        1: "调派",
        2: "已取件",
        3: "已取消",
      },
      // -1:待审核,0取消待审核1正常2审核通过3审核不通过
      cancelOrderState:{
        '-1': "待审核",
        0: "取消待审核",
        1: "正常",
        2: "审核通过",
        3: "审核不通过",
      },
      // 是否异常：0异常1正常
      orderIsError: {
        0: "异常",
        1: "正常",
      },
      // 是否结算：0未结算1已结算
      isJiesuan: {
        0: "未结算",
        1: "已结算",
      },
      // 是否取消：1是
      isCancel: {
        0: "未取消",
        1: "已取消",
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
      // this.query.cancelOrderState = [-1];
      this.query.pagetype = 6;
      if (this.query.createTime) {
        this.query.sTime = this.query.createTime[0];
        this.query.eTime = this.query.createTime[1];
      } else {
        this.query.eTime = undefined;
        this.query.sTime = undefined;
      }
    },
    toEdit(row, type) {
      crudJob.toCancel({
        content: this.form.content,
        id: row.id,
        stateType: type
      }).then(() => {
        this.crud.toQuery();
      });
    }
    // checkMethod(id) {
    //   updateState(id).then(() => {
    //     this.crud.toQuery();
    //   });
    // }
  },
};
</script>
