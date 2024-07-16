<template>
  <div class="page">
    <!-- 显示并编辑识别结果 -->
    <el-form ref="form" label-width="140px">
      <el-form-item label="选择收货地址：">
        <el-select v-model="selectAddressTo" placeholder="选择收货地址" style="width: 600px;" @change="toGetAddress('to')">
          <el-option :label="item.name +'-'+item.mobile +'-'+item.address" :value="item.id" v-for="item in addressList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="重量:kg" prop="weight">
            <el-input
              v-model="parsedData.weight"
              type="number"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="宽度:cm" prop="width">
            <el-input
              v-model="parsedData.width"
              type="number"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="长度:cm" prop="height">
            <el-input
              v-model="parsedData.height"
              type="number"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="高:cm" prop="length">
            <el-input v-model="parsedData.length" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="tip">包裹重量小体积大时按照体积计算重量，实际重量以快递员测量核实为准，点击设置体积测算体积重量，换算公式:体积重量=长x宽x高(cm)/8000</div>
      <el-form-item label="选择发货地址：">
        <el-select v-model="selectAddressFrom" placeholder="选择发货地址" style="width: 600px;" @change="toGetAddress('from')">
          <el-option :label="item.name +'-'+item.mobile +'-'+item.address" :value="item.id" v-for="item in addressList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货地址智能识别：" prop="name">
        <el-input
          type="textarea"
          :rows="4"
          v-model="inputText"
          @blur="parseText"
          addressList
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="parsedData" label-width="160px" :inline="true">
      <el-form-item label="发货人：" prop="fromName">
        <el-input v-model="parsedData.fromName"></el-input>
      </el-form-item>
      <el-form-item label="发货人手机号：" prop="fromMobile">
        <el-input v-model="parsedData.fromMobile"></el-input>
      </el-form-item>
      <el-form-item label="发货省：" prop="fromProv">
        <el-input v-model="parsedData.fromProv"></el-input>
      </el-form-item>
      <el-form-item label="发货市：" prop="fromCity">
        <el-input v-model="parsedData.fromCity"></el-input>
      </el-form-item>
      <el-form-item label="发货区/县：" prop="fromArea">
        <el-input v-model="parsedData.fromArea"></el-input>
      </el-form-item>
      <el-row>
      <el-form-item label="发货具体地址：" prop="fromAddress">
        <el-input v-model="parsedData.fromAddress"  type="textarea"  style="width: 600px"></el-input>
      </el-form-item>
      </el-row>
      <el-form-item>
          <div class="ml"><el-button type="primary" @click="onSubmit" :loading="loading">确定</el-button></div>
      </el-form-item>
    </el-form>
    <Dig ref="dig" />
  </div>
</template>
<script>
import Dig from "./dig.vue";
import { getCourierFreightCharge, addressAnalysis, getAddressList } from '@/api/cexpressorder/sendServer/index'
export default {
  components: {
    Dig
  },
  data() {
    return {
      loading: false,
      inputText: "",
      addressList: [],
      selectAddressFrom: '',
      selectAddressTo: '',
      parsedData: {
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
      },
    };
  },
  mounted() {
    getAddressList({pageNo: 1, pageSize: 1000}).then(res => {
      console.error("result", res.data);
      const result = res.data;
      this.addressList = result.items;
    });
  },
  methods: {
    parseText() {
      addressAnalysis({text: this.inputText}).then(res => {
        const result = JSON.parse(res.data);
        this.parsedData.fromName = result.person;
        this.parsedData.fromMobile = result.phonenum;
        this.parsedData.fromProv = result.province;
        this.parsedData.fromCity= result.city;
        this.parsedData.fromArea = result.county || result.town;
        this.parsedData.fromAddress = result.detail;
      });
    },
    toGetAddress(type) {
      console.error('type', type, this.selectAddressFrom);
      if (type === 'from') {
        let data;
        this.addressList.forEach(item => {
          if (item.id === this.selectAddressFrom) {
            data = item;
          }
        });
        this.parsedData.fromName = data.name;
        this.parsedData.fromMobile = data.mobile;
        this.parsedData.fromProv = data.province;
        this.parsedData.fromCity= data.city;
        this.parsedData.fromArea = data.area;
        this.parsedData.fromAddress = data.address;
      }
      if (type === 'to') {
        let data;
        this.addressList.forEach(item => {
          if (item.id === this.selectAddressTo) {
            data = item;
          }
        });
        this.parsedData.toName = data.name;
        this.parsedData.toMobile = data.mobile;
        this.parsedData.toProv = data.province;
        this.parsedData.toCity= data.city;
        this.parsedData.toArea = data.area;
        this.parsedData.toAddress = data.address;
      }
    },
    onSubmit() {
      this.loading = true;
      getCourierFreightCharge(this.parsedData).then(res => {
        this.loading = false;
        this.$refs.dig.showDialog(res.data.totalPrice);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.page {
  padding: 40px;
}
.tip {
  color: red;
  font-size: 14px;
  padding: 0 0 20px 140px;
}
.ml {
  margin-left: 160px;
}
</style>
