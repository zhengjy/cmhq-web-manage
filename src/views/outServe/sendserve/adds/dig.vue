<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      width="800px"
      title="预估运费"
      :visible.sync="dialogVisible"
    >
    <div style="font-size: 20px; margin-bottom: 20px">按重量计费，预估基础费用:￥<span style="color:red">{{price}}</span>元</div>
    <div style="font-size: 16px;">{{info}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消创建订单</el-button>
      <el-button type="primary" @click="ok">确定创建订单</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      price: '',
      info: '',
    }
  },
  methods: {
    showDialog(data) {
      this.dialogVisible = true;
      this.price = data.totalPrice;
      this.info = data.info;
    },
    ok() {
      this.$emit('ok');
    }
  }
}

</script>
