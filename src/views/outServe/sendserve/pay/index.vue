<template>
  <div class="page">
    <div class="box">
      <el-descriptions title="用户信息" column="2">
        <el-descriptions-item label="账户名称">{{
          reslut.createUserName
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          reslut.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="快递公司">{{
          reslut.courierCompanyCode
        }}</el-descriptions-item>
        <el-descriptions-item label="运单号">{{
          reslut.courierCompanyWaybillNo
        }}</el-descriptions-item>
        <el-descriptions-item label="公司">{{
          reslut.companyName
        }}</el-descriptions-item>
        <el-descriptions-item label="物品名称">{{
          reslut.goodsName
        }}</el-descriptions-item>
        <el-descriptions-item label="发货人姓名">
          {{ reslut.fromName }}</el-descriptions-item
        >
        <el-descriptions-item label="发货人电话">
          {{ reslut.fromMobile }}</el-descriptions-item
        >
        <el-descriptions-item label="收货人姓名">
          {{ reslut.toName }}</el-descriptions-item
        >
        <el-descriptions-item label="收货人电话">
          {{ reslut.toMobile }}</el-descriptions-item
        >
        <el-descriptions-item label="发货地址">
          {{ reslut.fromAddress }}</el-descriptions-item
        >
        <el-descriptions-item label="收货地址">
          {{ reslut.toAddress }}</el-descriptions-item
        >
        <el-descriptions-item label="预估重量">
          {{ reslut.weight }}</el-descriptions-item
        >
        <el-descriptions-item label="实际重量">
          {{ reslut.weightto }}</el-descriptions-item
        >
        <el-descriptions-item label="预估费用">
          {{ reslut.estimatePrice }}</el-descriptions-item
        >
        <el-descriptions-item label="实际费用">
          {{ reslut.price }}</el-descriptions-item
        >
        <el-descriptions-item label="订单状态">
          {{ orderState[reslut.orderState] }}</el-descriptions-item
        >
        <el-descriptions-item label="订单取消状态">{{
          cancelOrderState[reslut.cancelOrderState]
        }}</el-descriptions-item>
        <el-descriptions-item label="物流状态">{{
          wuliuState[reslut.wuliuState]
        }}</el-descriptions-item>
        <el-descriptions-item label="是否异常">{{
          orderIsError[reslut.orderIsError]
        }}</el-descriptions-item>
        <el-descriptions-item label="取消原因">{{
          reslut.reason
        }}</el-descriptions-item>
        <el-descriptions-item label="异常信息">{{
          reslut.courierOrderExtend && reslut.courierOrderExtend.orderIsErrorMsg
        }}</el-descriptions-item>
        <el-descriptions-item label="是否结算">{{
          isJiesuan[reslut.isJiesuan]
        }}</el-descriptions-item>
      </el-descriptions>

      <date-range-picker  type="datetimerange" v-model="time" class="date-item" />
      <br />
      <br />
      <el-button type="primary" @click="toChangeTime" :loading="loading"
        >修改收货时间</el-button
      >
      <el-button type="primary" @click="goPay" :loading="loadingPay"
        >收款</el-button
      >
    </div>
    <TimeChangeDig ref="timeChangeDig"/>
  </div>
</template>
<script>
import {
  getSelectOrderPayByOrderNot,
  updateGoodTime,
  selectOrderByOrderNo,
  toAliPayPcNew,
} from "@/api/cexpressorder/sendServer/index";
import TimeChangeDig from "../../../cexpressorder/order/list/timeChangeDig.vue";


export default {
  components: { TimeChangeDig },
  data() {
    return {
      loading: false,
      loadingPay: false,
      reslut: {},
      time: [],
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
        3: "已取消",
      },
      // -1:待审核,0取消待审核1正常2审核通过3审核不通过
      cancelOrderState: {
        "-1": "待审核",
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
    };
  },
  mounted() {
    selectOrderByOrderNo({ orderNo: this.$route.query.orderNo }).then((res) => {
      this.reslut = res.data;
    });
    getSelectOrderPayByOrderNot({ orderNo: this.$route.query.orderNo }).then(
      (res) => {
        if (res.data) {
          this.$router.push({
            path: "/outServeList",
            query: {
              orderNo: this.$route.query.orderNo,
            },
          });
        }
      }
    );
  },
  methods: {
    goPay() {
      this.loadingPay = true;
      toAliPayPcNew({
        orderCode: this.reslut.orderNo,
      })
        .then((res) => {
          this.loadingPay = false;
          window.location.href = res.data;
        })
        .catch((err) => {
          // this.loadingPay = false;
          console.log(err);
        });
    },
    toChangeTime() {
      this.$refs.timeChangeDig.showDialog(this.reslut.id);
    }
  },
};
</script>
<style scoped lang="scss">
.page {
  padding: 10px 10px 10px;
}
</style>
