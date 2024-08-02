<template xmlns="http://www.w3.org/1999/html">
  <div class="page">
    <div class="box">
      <!-- <div class="header">发货配置</div> -->
      <!-- 显示并编辑识别结果 -->

      <el-form ref="form"  label-width="140px" inline size="small">
        <el-form-item label="当前：">
          <span :class="{ active: hobbydata.includes('1'), text: true }"
            >正向</span
          >
          <span :class="{ active: hobbydata.includes('2'), text: true }"
            >逆向</span
          >
        </el-form-item>
        <el-form-item label="下单来源:">
          <el-tooltip class="item" effect="dark" content="20kg以上产品走快运B2C" placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-radio-group v-model="parsedData.orderOrigin" @input="orderOriginInput" size="mini" style="width: 178px">
            <el-radio-button label="1">快递B2C</el-radio-button>
            <el-radio-button label="4">快运B2C</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单编号:">
          <el-tooltip class="item" effect="dark" content="商家退货的线上订单编号，商家选填" placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-input
            v-model="parsedData.courierOrderExtend.company_bill_code"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="物品分类：">
          <el-select v-model="parsedData.courierOrderExtend.jtGoodsType">
            <el-option label="文件" value="bm000001"></el-option>
            <el-option label="数码产品" value="bm000002"></el-option>
            <el-option label="生活用品" value="bm000003"></el-option>
            <el-option label="食品" value="bm000004"></el-option>
            <el-option label="服饰" value="bm000005"></el-option>
            <el-option label="其他" value="bm000006"></el-option>
            <el-option label="生鲜类" value="bm000007"></el-option>
            <el-option label="易碎品" value="bm000008"></el-option>
            <el-option label="液体" value="bm000009"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="快递类型：">
          <el-select v-model="parsedData.billType">
            <el-option label="普通" value="00"></el-option>
            <el-option label="代收" value="01"></el-option>
            <el-option label="到付" value="02"></el-option>
            <el-option label="国际" value="03"></el-option>
            <el-option label="生鲜" value="04"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="是否带电：">
          <el-select v-model="parsedData.battery">
            <el-option label="未知" value="10"></el-option>
            <el-option label="带电" value="20"></el-option>
            <el-option label="不带电" value="30"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="物品类型：">
          <el-select v-model="parsedData.courierOrderExtend.goodsType">
            <el-option label="大件" value="大件"></el-option>
            <el-option label="小件" value="小件"></el-option>
            <el-option label="扁平件\文件" value="扁平件\文件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：" prop="goodsName">
          <el-select
            size="small"
            v-model="parsedData.goodsName"
            filterable
            placeholder="选择产品"
            style="width: 186px"
            @change="goodsNameChange"
          >
            <el-option
              :label="
                item.categoreCode
                  ? item.categoreCode + '-' + item.categoryName
                  : item.categoryName
              "
              :value="
                item.categoreCode
                  ? item.categoreCode + '-' + item.categoryName
                  : item.categoryName
              "
              v-for="(item, index) in categoryList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择发货地址：" v-if="hobbydata.includes('1')">
          <el-select
            size="small"
            v-model="selectAddressFrom"
            placeholder="选择发货地址"
            style="width: 600px"
            @change="toGetAddress('from')"
          >
            <el-option
              :label="item.name + '-' + item.mobile + '-' + item.address"
              :value="item.id"
              v-for="item in addressList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="发货地址智能识别：" prop="name">
          <el-input
            type="textarea"
            style="width: 600px; height: 110px"
            :rows="5"
            size="small"
            placeholder="请输入或粘贴文本，自动识别地址信息，格式：姓名+空格+电话+空格+分机号+空格+省市区详情地址"
            v-model="inputTextFrom"
            @blur="parseText('from')"
            addressList
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="发货人：" prop="fromName">
          <el-input
            v-model="parsedData.fromName"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货人手机号：" prop="fromMobile">
          <el-input
            v-model="parsedData.fromMobile"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货分区号：" prop="fromPartitionNumber">
          <el-input
            v-model="parsedData.fromPartitionNumber"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="发货省：" prop="fromProv">
          <el-input v-model="parsedData.fromProv" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="发货市：" prop="fromCity">
          <el-input v-model="parsedData.fromCity" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="发货区/县：" prop="fromArea">
          <el-input v-model="parsedData.fromArea" style="width: 186px"></el-input>
        </el-form-item> -->
        <el-form-item label="省市区：" prop="fromArea">
          <el-cascader
            size="small"
            :options="options"
            v-model="selectedFrom"
            @change="handleChangeFrom"
            style="width: 220px"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="发货具体地址：" prop="fromAddress">
          <el-input
            v-model="parsedData.fromAddress"
            type="textarea"
            :rows="1"
            size="samll"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="重量(必填):kg"
              prop="weight"
              label-width="100px"
              style="color: red"
            >
              <el-input
                v-model="parsedData.weight"
                type="number"
                placeholder="必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="宽度:cm" prop="width" label-width="80px">
              <el-input
                v-model="parsedData.width"
                type="number"
                placeholder="非必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="长度:cm" prop="height" label-width="80px">
              <el-input
                v-model="parsedData.height"
                type="number"
                placeholder="非必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="高:cm" prop="length" label-width="80px">
              <el-input
                v-model="parsedData.length"
                type="number"
                placeholder="非必填"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="font-size: 14px;padding: 0px 0px 10px 80px;font-weight:bolder;">
          注：包裹重量小体积大时按照体积计算重量，实际重量以订单签收后实时回传重量为准哦~，
          <span @click="billRuleShow"  style="cursor: pointer;color: red;">点击了解计费规则和注意事项</span
          >
        </div>
        <el-form-item label="期望上门取件时间：" prop="time" style="width: 500px">
          <!-- <date-range-picker  type="datetimerange" v-model="parsedData.time" class="date-item" /> -->
          <QuickTime :value.sync="parsedData.time"  style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注：" prop="msg">
          <el-input
            v-model="parsedData.msg"
            type="textarea"
            :rows="1"
            size="samll"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 收货 -->
    <div class="box">
      <!-- <div class="header header-title">收货配置</div> -->
      <el-form ref="form" label-width="140px" inline size="small">
        <el-form-item label="选择收货地址：" v-if="hobbydata.includes('2')">
          <el-select
            v-model="selectAddressTo"
            placeholder="选择收货地址"
            style="width: 600px"
            @change="toGetAddress('to')"
          >
            <el-option
              :label="item.name + '-' + item.mobile + '-' + item.address"
              :value="item.id"
              v-for="item in addressList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="收货地址智能识别：" prop="name">
          <el-input
            type="textarea"
            style="width: 600px; height: 108px"
            :rows="5"
            v-model="inputTextTo"
            placeholder="请输入或粘贴文本，自动识别地址信息，格式：姓名+空格+电话+空格+分机号+空格+省市区详情地址"
            @blur="parseText"
            addressList
          ></el-input>
          <span class="tips-2"> 选择收货地址和智能识别2选1 </span>
        </el-form-item>
        <br />
        <el-form-item label="收货人：" prop="fromName">
          <el-input v-model="parsedData.toName" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货人手机号：" prop="toMobile">
          <el-input
            v-model="parsedData.toMobile"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货分区号：" prop="toPartitionNumber">
          <el-input
            v-model="parsedData.toPartitionNumber"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="收货省：" prop="toProv">
          <el-input v-model="parsedData.toProv" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货市：" prop="toCity">
          <el-input v-model="parsedData.toCity" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货区/县：" prop="toArea">
          <el-input v-model="parsedData.toArea" style="width: 186px"></el-input>
        </el-form-item> -->
        <el-form-item label="收货省市区：" prop="toArea">
          <el-cascader
            size="small"
            :options="options"
            v-model="selectedTo"
            @change="handleChangeTo"
            style="width: 220px"
          >
          </el-cascader>
        </el-form-item>
        <el-row>
          <el-form-item label="收货具体地址：" prop="toAddress">
            <el-input
              v-model="parsedData.toAddress"
              type="textarea"
              :rows="1"
              style="width: 600px"
            ></el-input>
          </el-form-item>
        </el-row>
        <div class="agree-warp">
          <el-checkbox v-model="checkedAgree"></el-checkbox>&nbsp;&nbsp;我已理解并遵守<span
            @click="xieyiShow" class="link"
            >《服务协议》</span
          >
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="!checkedAgree"
            :loading="loading"
            >确定</el-button
          >
          <el-button type="primary" @click="getShareUrlAdd"
            >获取分享地址</el-button
          >
        </el-form-item>
      </el-form>

      <Dig ref="dig" @ok="toSubmit" />
      <XieyiDig ref="xieyiDig"   @checkedAgreeHandle="checkedAgreeHandle"  />
      <BillRuleDig ref="billRuleDig"/>
    </div>
  </div>
</template>
<script>
import Dig from "./dig.vue";
import DateRangePicker from "@/components/DateRangePicker";
import QuickTime from "@/components/QuickTime";
import BillRuleDig from "../billRule.vue";
import XieyiDig from "../xieyi.vue";

import {
  getCourierFreightCharge,
  addressAnalysis,
  getAddressList,
  createCourierOrder,
  getShareUrlAdd,
  getCurrentCompany,
  getCategoryList,
} from "@/api/cexpressorder/sendServer/index";
import { pcaTextArr } from "@/utils/area/index";
import {form} from "../../../../components/Crud/crud";
import Storage from "../../../tools/storage/index.vue";
export default {
  name: "addsOrder",
  components: {
    Storage,
    Dig,
    XieyiDig,
    BillRuleDig,
    DateRangePicker,
    QuickTime,
  },
  data() {
    return {
      loading: false,
      checkedAgree: true,
      dialogVisible: false,
      billRule:false,
      inputTextTo: "",
      inputTextFrom: "",
      addressList: [],
      categoryList: [],
      selectAddressTo: "",
      selectAddressFrom: "",
      options: pcaTextArr,
      selectedFrom: [],
      selectedTo: [],
      hobbydata: [],
      parsedData: {
        // billType: '00',
        // battery:  '10',
        time: [],
        fromName: null,
        fromMobile: null,
        fromProv: null,
        fromCity: null,
        fromArea: null,
        fromAddress: null,
        toName: null,
        toMobile: null,
        toProv: null,
        toCity: null,
        toArea: null,
        toAddress: null,
        weight: null,
        width: null,
        length: null,
        height: null,
        orderOrigin: "1",
        courierOrderExtend: {
          goodsType: "小件",
          jtGoodsType: "bm000001",
          company_bill_code: ""
        },
      },
    };
  },
  mounted() {
    getCategoryList({ pageNo: 1, pageSize: 10000 }).then((res) => {
      console.error("categoryName", res.data);
      const result = res.data;
      this.categoryList = result.items;
    });
    getCurrentCompany().then((res) => {
      this.hobbydata = JSON.parse(res.data.hobbydata);
      console.error("this.hobbydata", this.hobbydata);
    });
    getAddressList({ pageNo: 1, pageSize: 1000 }).then((res) => {
      console.error("result", res.data);
      const result = res.data;
      this.addressList = result.items;
    });
  },
  methods: {
    form,
    checkedAgreeHandle() {
      this.checkedAgree = true;
      this.dialogVisible = false;
    },
    orderOriginInput(data){
      if (data === '4'){
        this.parsedData.courierOrderExtend.goodsType='大件'
      }else {
        this.parsedData.courierOrderExtend.goodsType='小件'
      }
    },
    getShareUrlAdd() {
      let url = "";
      getShareUrlAdd({}).then((res) => {
        url = `${location.origin}/mngall/#/outServeAdds?companyId=${res.data.companyId}&userId=${res.data.userId}&orderNo=${res.data.orderNo}`;
        window.open(url);
      });
    },
    getPayShareUrlAdd() {
      let url = "";
      getShareUrlAdd({}).then((res) => {
        console.error("result", res.data);
        url = `${location.origin}/mngall/#/outServeAdds?companyId=${res.data.companyId}&userId=${res.data.userId}&orderNo=${res.data.orderNo}`;
        window.open(url);
      });
    },
    parseText(type) {
      let text = "";
      if (type === "from") {
        text = this.inputTextFrom;
      } else {
        text = this.inputTextTo;
      }
      addressAnalysis({ text: text }).then((res) => {
        const result = JSON.parse(res.data);
        console.error("result", JSON.parse(res.data));
        if (type === "from") {
          this.parsedData.fromName = result.person;
          this.parsedData.fromMobile = result.phonenum;
          this.parsedData.fromProv = result.province;
          this.parsedData.fromCity = result.city;
          this.parsedData.fromArea = result.county || result.town;
          this.parsedData.fromAddress = result.detail;
          this.selectedFrom = [
            result.province,
            result.city,
            this.parsedData.fromArea,
          ];
        } else {
          this.parsedData.toName = result.person;
          this.parsedData.toMobile = result.phonenum;
          this.parsedData.toProv = result.province;
          this.parsedData.toCity = result.city;
          this.parsedData.toArea = result.county || result.town;
          this.parsedData.toAddress = result.detail;
          this.selectedTo = [
            result.province,
            result.city,
            this.parsedData.toArea,
          ];
        }
      });
    },
    handleChangeFrom(value) {
      this.parsedData.fromProv = value[0];
      this.parsedData.fromCity = value[1];
      this.parsedData.fromArea = value[2];
      console.log("handleChangeFrom", value);
    },
    handleChangeTo(value) {
      this.parsedData.toProv = value[0];
      this.parsedData.toCity = value[1];
      this.parsedData.toArea = value[2];
      console.log("handleChangeTo", value);
    },
    toGetAddress(type) {
      console.error("type", type, this.selectAddressFrom);
      if (type === "from") {
        let data;
        this.addressList.forEach((item) => {
          if (item.id === this.selectAddressFrom) {
            data = item;
          }
        });
        this.parsedData.fromName = data.name;
        this.parsedData.fromMobile = data.mobile;
        this.parsedData.fromProv = data.province;
        this.parsedData.fromCity = data.city;
        this.parsedData.fromArea = data.area;
        this.parsedData.fromAddress = data.address;
        this.selectedFrom = [data.province, data.city, data.area];
      }
      if (type === "to") {
        let data;
        this.addressList.forEach((item) => {
          if (item.id === this.selectAddressTo) {
            data = item;
          }
        });
        this.parsedData.toName = data.name;
        this.parsedData.toMobile = data.mobile;
        this.parsedData.toProv = data.province;
        this.parsedData.toCity = data.city;
        this.parsedData.toArea = data.area;
        this.parsedData.toAddress = data.address;
        this.selectedTo = [data.province, data.city, data.area];
      }
    },
    goodsNameChange(data) {
      this.categoryList.forEach((item) => {
        if (
          item.categoryName === data ||
          item.categoreCode + "-" + item.categoryName === data
        ) {
          this.parsedData.weight = item.weight;
          this.parsedData.height = item.height;
          this.parsedData.length = item.length;
          this.parsedData.width = item.width;
        }
      });
    },
    xieyiShow(){
      this.$refs.xieyiDig.xieYishowDialog(true);
    },
    billRuleShow(){
      this.$refs.billRuleDig.showDialog();
    },
    onSubmit() {
      if (this.parsedData.weight >20 && this.parsedData.orderOrigin ==='1'){
        this.$notify({
          title: "重量超过20kg请选择快运B2C！",
          type: "error",
          duration: 3000,
        });
        return;
      }

      this.loading = true;
      getCourierFreightCharge({
        ...this.parsedData,
        takeGoodsTime: this.parsedData.time[0],
        takeGoodsTimeEnd: this.parsedData.time[1],
      })
        .then((res) => {
          this.loading = false;
          console.error(" this.$refs.dig", this.$refs.dig);
          this.$refs.dig.showDialog(res.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toSubmit() {

      createCourierOrder({
        ...this.parsedData,
        takeGoodsTime: this.parsedData.time[0],
        takeGoodsTimeEnd: this.parsedData.time[1],
      }).then((res) => {
        console.error("result", res.data);
        this.parsedData.fromName=''
        this.parsedData.fromMobile=''
        this.parsedData.fromPartitionNumber=''
        this.parsedData.fromPartitionNumber=''
        this.parsedData.fromProv=''
        this.parsedData.fromCity=''
        this.parsedData.fromArea=''
        this.parsedData.fromAddress=''
        this.parsedData.orderOrigin='1'
        this.inputTextFrom = ''
        this.selectedFrom = ''
        this.checkedAgree = false
        this.parsedData.fromPartitionNumber=''
        this.parsedData.courierOrderExtend.company_bill_code = ''
        this.$router.push({ path: "/cexpressorder/list" });
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.page {
  padding: 20px 20px 200px;
  background-color: rgba(241, 244, 246);
  .box {
    max-width: 1405px;
    margin: 0 auto;
    .header {
      font-size: 20px;
      font-weight: bold;
      padding: 16px;
    }
    .header-title {
      padding: 0px 16px 16px 16px;
    }
    .tips {
      font-size: 14px;
      color: #f00;
      padding: 0px 0px 20px 80px;
    }
    .tips-2 {
      font-size: 14px;
      color: #f00;
      padding: 0px 0px 0px 0px;
      vertical-align: top;
    }
  }
  .agree-body {
    max-height: 400px;
    overflow-y: scroll;
  }
  .agree-warp {
    font-size: 14px;
    padding: 12px 0;
    .link {
      cursor: pointer;
      color: #1890ff;
    }
  }

  ::v-deep label[for="weight"] {
    color: red;
  }
  .active {
    display: inline-block;
    background-color: #42b983;
    color: #fff !important;
    border-color: #42b983;
    padding: 0px 10px;
    margin-right: 10px;
  }
  .text {
    color: #1890ff;
  }
}
</style>
