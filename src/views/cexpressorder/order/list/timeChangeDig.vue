<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      width="730px"
      :visible.sync="dialogVisible"
    >
      <div class="content">
        <el-form>
          <el-form-item label="期望上门取件时间：" prop="takeGoodsTime">
            <QuickTime :value.sync="time"/> 
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit"
            :loading="loading"
                  >确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updateGoodTime } from "@/api/cexpressorder/sendServer/index";
import QuickTime from "@/components/QuickTime";

export default {
  components: { QuickTime },
  data() {
    return {
      dialogVisible: false,
      time: [],
      id: ''
    };
  },
  methods: {
    showDialog(id) {
      this.dialogVisible = true;
      this.id = id;
    },
    onSubmit() {
      updateGoodTime({id: this.id, takeGoodsTime:this.time[0], takeGoodsTimeEnd: this.time[1]}).then(res => {
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
      }).finally(()=> {
        this.loading = false;
      });
    },
  },
};
</script>
