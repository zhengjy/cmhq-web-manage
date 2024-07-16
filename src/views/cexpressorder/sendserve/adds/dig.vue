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
    <div style="font-size: 16px; line-height: 24px;">{{info}}<div>超过限制加收超长超重费用（即包裹满足以下任意一个条件：①最长边大于1.6米；②计费重量大于50KG，即认定为超长超重货，该单货物将在原收费基础上加收超长超重费。加收标准按照：计费重量1元/kg计算，最低加收20元/票）
  </div>
   </div>
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
      this.dialogVisible = false;
    }
  }
}

</script>
