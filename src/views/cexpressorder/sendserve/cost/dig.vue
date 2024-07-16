<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      width="400px"
      title="预估运费"
      :visible.sync="dialogVisible"
    >
    <span style="font-size: 16px;">查询成功,预估运费{{price}}元</span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      price: '',
    }
  },
  methods: {
    showDialog(price) {
      this.dialogVisible = true;
      this.price = price;
    },
  }

}

</script>
