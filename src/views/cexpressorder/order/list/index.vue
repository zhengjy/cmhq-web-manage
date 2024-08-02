<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <QuickSelect
          :typedata="orderState"
          @select="(item) => changeBtn(item, 'orderState')"
          allText="全部订单状态"
        />
        <QuickSelect
          :typedata="wuliuState"
          @select="(item) => changeBtn(item, 'wuliuState')"
          allText="全部物流状态"
        />

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
          <el-form-item label="运单号">
            <el-input v-model="query.courierCompanyWaybillNo" />
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input v-model="query.companyBillCode" />
          </el-form-item>
          <!-- <el-form-item label="订单状态">
            <el-select v-model="query.orderState" style="width: 172px;" v-if="query.orderState !== '000'">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="待取件" :value="0"></el-option>
              <el-option label="调派" :value="1"></el-option>
              <el-option label="已取件" :value="2"></el-option>
              <el-option label="已取消" :value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="物流状态">
            <el-select v-model="query.wuliuState" style="width: 172px">
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
          <!-- <el-form-item label="是否异常">
            <el-select v-model="query.orderIsError" style="width: 172px;">
              <el-option label="全部" :value="''"></el-option>
              <el-option label="异常" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="否结算">
            <el-select v-model="query.isJiesuan" style="width: 172px">
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
      <crudOperation />
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
          @click="toCancel"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <div class="btn-container">
    <el-popover
    placement="right"
    title=""
    width="200"
    trigger="hover"
    content="导入成功自动下单">
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleChange"
      :on-error="handleError"
      :headers="myHeaders"
      slot="reference"
    >
    <el-button  size="small" type="primary">上传</el-button>
    </el-upload>
  </el-popover>
  &nbsp;&nbsp;&nbsp;
    <el-button size="small" type="primary">
      <a href="http://120.76.156.209:8000/file/文档/订单导入模板-20240617084252269.xlsx" target="_blank">
        下载模板
      </a>
    </el-button>
  </div>
    <br />
    <!--表格渲染-->
    <el-table
      ref="table"
      fit
      v-loading="crud.loading"
      :data="crud.data"
      border
      style="width: 100%"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createUserName"
        label="账户名称"
        width="150"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="company_bill_code"
        label="订单编号"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{
              getCourierOrderExtendValue(scope.row.courierOrderExtend, 'company_bill_code')
            }}</span>
        </template>
      </el-table-column>

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
        width="70"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="courierCompanyWaybillNo"
        label="运单号"
        width="150"
      >
        <template slot-scope="scope">
          <div class="copy_box">
            {{ scope.row.courierCompanyWaybillNo }}
            <i
              class="el-icon-document-copy copy"
              @click="copy(scope.row.courierCompanyWaybillNo)"
            ></i>
          </div>
        </template>
      </el-table-column>
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
          <span>{{ orderState[scope.row.orderState] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="wuliuState"
        label="物流状态"
      >
        <template slot-scope="scope">
          <span>{{ wuliuState[scope.row.wuliuState] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orderOrigin"
        label="下单来源"
      >
        <template slot-scope="scope">
          <span>{{ orderOrigin[scope.row.orderOrigin] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="orderState"
        label="订单取消状态"
      >
        <template slot-scope="scope">
          <span>{{ cancelOrderState[scope.row.cancelOrderState] }}</span>
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
          <span>{{ orderIsError[scope.row.orderIsError] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="reason"
        label="异常原因"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{
              getCourierOrderExtendValue(scope.row.courierOrderExtend, 'orderIsErrorMsg')
          }}</span>
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
      <el-table-column label="操作" width="200px" align="center" fixed="right">
        <template slot-scope="scope">
          <!-- <el-popover
            :ref="scope.row.id"
            placement="top"
            width="200"
          >
            <p>确认收货？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="checkMethod(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="mini">确认收货</el-button>
          </el-popover> -->
          <el-button
            size="mini"
            style="margin-right: 3px"
            type="text"
            @click="toChangeTime(scope.row.id)"
            >一键催揽</el-button
          >
          <el-tooltip
            class="item"
            effect="dark"
            content="商家运费险，保险公司赔付客户保额内退换货运费"
            placement="top"
          >
            <el-button
              size="mini"
              style="margin-right: 3px"
              type="text"
              v-if="scope.row.is_pay === 'Y'"
              @click="toPay(scope.row)"
            >
              去收款&nbsp;&nbsp;
            </el-button>
          </el-tooltip>
          <el-button
            style="margin-left: -2px"
            type="text"
            size="mini"
            @click="toQueryCourierTrack(scope.row.id)"
            >物流信息</el-button
          >
          <el-button
            size="mini"
            style="margin-right: 3px"
            type="text"
            v-if="scope.row.courierCompanyWaybillNo === '' || scope.row.courierCompanyWaybillNo === undefined "
            @click="toDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <Dig ref="dig" />
    <TimeChangeDig ref="timeChangeDig" />
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import pagination from "@crud/Pagination";
import DateRangePicker from "@/components/DateRangePicker";
import crudOperation from "@crud/CRUD.operation";
import crudJob from "@/api/cexpressorder/ziorder/tocancel.js";
import { updateState } from "@/api/cexpressorder/ziorder/orderList.js";
import Dig from "./dig.vue";
import TimeChangeDig from "./timeChangeDig.vue";
import QuickSelect from "@/components/QuickSelect";
import { getToken } from "@/utils/auth";

const defaultForm = {
  companyName: "",
};
export default {
  name: "Timing",
  components: {
    pagination,
    rrOperation,
    DateRangePicker,
    crudOperation,
    Dig,
    TimeChangeDig,
    QuickSelect,
  },
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
      currentOrderState: "",
      currentId: "",
      uploadUrl: process.env.VUE_APP_BASE_API + "/courierOrder/uploadExcel",
      myHeaders: {
        Authorization: getToken(),
      },
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
        0: "待取件",
        1: "调派",
        2: "已取件",
        // 3: "已取消",
      },
      // -1:待审核,0取消待审核1正常2审核通过3审核不通过
      cancelOrderState: {
        "-1": "待审核",
        0: "取消待审核",
        1: "正常",
        2: "审核通过",
        3: "审核不通过",
      },
      // 京东下单来源1：快递B2C，4：快运B2C
      orderOrigin: {
        1: "快递B2C",
        4: "快运B2C",
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
      this.query.pagetype = 1;
      if (this.query.createTime) {
       this.query.sTime = this.query.createTime[0];
       this.query.eTime = this.query.createTime[1];
      } else {
        this.query.eTime = undefined;
        this.query.sTime = undefined;
      }
    },
    getCourierOrderExtendValue(courierOrderExtend,propertyName) {
      const parsedData = JSON.parse(courierOrderExtend);
      return parsedData[propertyName];
    },

    toDelete(id) {
      this.delLoading = true;
      crudJob
        .del([id])
        .then(() => {
          this.crud.toQuery();
        })
        .catch(() => {
          this.crud.toQuery();
        });
    },
    handleChange(file, fileList) {
      console.error(file, fileList);
      this.$notify({
        title: "上传成功！",
        type: "success",
        duration: 1500,
      });
      this.crud.toQuery();
    },
    changeBtn(item, key) {
      console.error(item, key);
      this.query[key] = item.key;
      this.crud.toQuery();
    },
    toQueryCourierTrack(id) {
      this.$refs.dig.showDialog(id);
    },
    toEdit(row) {
      this.crud.toEdit(row);
    },
    checkMethod(id) {
      updateState(id).then(() => {
        this.crud.toQuery();
      });
    },
    toPay(item) {
      let routeData = this.$router.resolve({
        path: "/outServePay",
        query: {
          orderNo: item.orderNo,
        },
      });
      window.open(routeData.href, '_blank');
    },
    toChangeTime(id) {
      this.$refs.timeChangeDig.showDialog(id);
    },
    handleError(err, file, fileLis) {
      this.$notify({
        title: JSON.parse(err.message).message,
        type: "error",
        duration: 1500,
      });
    },
    copy(value) {
      if (navigator.clipboard === 1) {
        navigator.clipboard.writeText(value).then((res) => {
          console.log(res);
          this.$message({
            message: "复制成功",
            type: "success",
          });
        });
      } else {
        // 创建隐藏的 textarea
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea); // 添加到 DOM 中以便可以操作

        // 选中文本
        textArea.select();
        // 执行复制命令
        try {
          const isCopied = document.execCommand("copy");
          if (isCopied) {
            this.$message({
              message: "复制成功",
              type: "success",
            });
          }
        } catch (err) {
          console.error("无法复制文本: ", err);
        }

        // 复制完成后移除 textarea
        document.body.removeChild(textArea);
      }
    },
  },
};
</script>
<style lang="scss">
.copy_box {
  position: relative;
  width: auto;
  display: inline-block;
  padding-right: 10px;
  .copy {
    color: #13ce66;
  }
}
.upload-demo {
  width: 50px;
}
.btn-container {
  display: flex;
}
</style>
