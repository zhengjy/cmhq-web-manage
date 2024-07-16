<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      width="730px"
      :visible.sync="dialogVisible"
    >
      <div class="content">
        <el-steps direction="vertical" :active="1">
          <div v-for="(item, index) in data" :key="index">
            <el-step
            :title="item.opDesc"
            :description="item.opTime"
          ></el-step>
          </div>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryCourierTrack } from "@/api/cexpressorder/ziorder/orderList";
export default {
  data() {
    return {
      dialogVisible: false,
      data: [
      ],
    };
  },
  methods: {
    showDialog(id) {
      this.dialogVisible = true;
      queryCourierTrack(id).then((res) => {
        let data = [];
        let arr = Object.keys(res.data);
         arr.forEach(item => {
          data.push({opTime: item, opDesc: res.data[item]})
        });
        this.data = data;
      });
    },
  },
};
</script>
