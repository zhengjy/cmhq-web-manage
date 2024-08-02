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
      <el-form-item label="发货地址智能识别：" prop="name">
        <el-input
          type="textarea"
          :rows="4"
          v-model="inputText"
          @blur="parseText"
        ></el-input>
      </el-form-item>
        <!-- <el-form-item label="省：" prop="province">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="市：" prop="city">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="区/县：" prop="area">
          <el-input v-model="form.area"></el-input>
        </el-form-item> -->
        <el-form-item label="省市区：" prop="fromArea">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedFrom"
            @change="handleChangeFrom"
            style="width: 220px"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="名字：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="分机号：" prop="extel">
          <el-input v-model="form.extel"></el-input>
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
      <el-table-column
        :show-overflow-tooltip="true"
        prop="province"
        label="省"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="city"
        label="市"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="area"
        label="区/县"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="名字"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        width="200"
        label="地址"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="mobile"
        width="120"
        label="手机号"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="extel"
        width="120"
        label="分机号"
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
import crudJob from "@/api/cexpressorder/ziaddress/index";
import { addressAnalysis } from '@/api/cexpressorder/sendServer/index'
import { pcaTextArr } from '@/utils/area/index'

const defaultForm = {
  id: "",
  province: "",
  city: "",
  area: "",
  name: "",
  address: "",
  mobile: "",
  extel: "",
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "ziaddress/list",
      crudMethod: { ...crudJob },
      optShow: {
        add: false,
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
      inputText: "",
      options: pcaTextArr,
      selectedFrom: "",
      delLoading: false,
      fauserList: [],
      permission: {
        add: ["admin", "ziaddress:add"],
        edit: ["admin", "ziaddress:edit"],
        del: ["admin", "ziaddress:del"],
      },
      rules: {
        // jobName: [
        //   { required: true, message: "请输入任务名称", trigger: "blur" },
        // ],
      },
    };
  },
  mounted() {
  },
  methods: {
    parseText() {
      addressAnalysis({text: this.inputText}).then(res => {
        const result = JSON.parse(res.data);
        this.form.name = result.person;
        this.form.mobile = result.phonenum;
        this.form.province = result.province;
        this.form.city= result.city;
        this.form.area = result.county;
        this.form.address = result.detail;
        this.selectedFrom = [result.province, result.city, result.county];
      });
    },
    handleChangeFrom (value) {
      this.form.province = value[0];
      this.form.city = value[1];
      this.form.area = value[2];
      console.log('handleChangeFrom', value)
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
    toEdit(row) {
      this.inputText = '';
      this.selectedFrom = [row.province, row.city, row.area];
      this.crud.toEdit(row);
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
  },
};
</script>
