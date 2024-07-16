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

        <el-form-item label="始发省">
          <el-input v-model="query.fromPro" />
        </el-form-item>
        <el-form-item label="始发地">
          <el-input v-model="query.fromCity" />
        </el-form-item>
          <el-form-item label="目的省">
            <el-input v-model="query.toPro" />
          </el-form-item>
          <el-form-item label="目的地">
            <el-input v-model="query.toCity" />
          </el-form-item>
          <el-form-item label="首重">
            <el-input v-model="query.sPrice" style="width:80px"/> -
            <el-input v-model="query.ePrice" style="width:80px"/>
          </el-form-item>
          <el-form-item label="续重">
            <el-input v-model="query.sToPrice" style="width:80px"/> -
            <el-input v-model="query.eToPrice" style="width:80px"/>
          </el-form-item>
          <rrOperation />
        </el-form>
      </div>
      <crudOperation />
    </div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success="handleChange"
      >
      <!-- <el-button size="small" type="primary">上传</el-button> -->
    </el-upload>
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
        prop="proF"
        label="始发省"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityF"
        label="始发地"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="proD"
        label="目的省"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="cityD"
        label="目的地"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="price"
        label="首重"
      />
      <el-table-column
        :show-overflow-tooltip="true"
        prop="priceTo"
        label="续重"
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
// import crudJob from "@/api/cexpressorder/ziorder/tocancel.js";
import { updateState } from "@/api/cexpressorder/ziorder/orderList.js";
const defaultForm = {
  companyName: ""
};
export default {
  name: "Timing",
  components: { pagination, rrOperation, DateRangePicker, crudOperation },
  cruds() {
    return CRUD({
      title: "",
      url: "/fcCompanyCost/list",
      crudMethod: { },
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
      rules: {
        // jobName: [
        //   { required: true, message: "请输入任务名称", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.error(file, fileList);
    },
    checkMethod(id) {
      updateState(id).then(() => {
        this.crud.toQuery();
      });
    }
  },
};
</script>
