<template>
  <div class="page">
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="120px">
      <el-form-item label="当前余额：">
        <span>{{ info.money }}</span>
      </el-form-item>
      <el-form-item label="冻结金额：">
        <span>{{ info.estimatePrice }}</span>
        <span style="color: red;margin-left: 10px;">账户下单 系统会先冻结下单的预估金额 等订单签收后会再扣除实际的金额 </span>
      </el-form-item>
      <el-form-item label="输入充值金额：" prop="totalAmount">
        <el-input v-model="form.totalAmount" style="width: 35%" />
      </el-form-item>
      <el-form-item label="">
        <el-button :loading="loading" size="medium" type="primary" @click.prevent="doSubmit">去支付</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { toAliPayPcNew, getCurrentCompany } from '@/api/tools/alipay'
export default {
  data() {
    return {
      url: '',
      // 新窗口的引用
      newWin: null,
      loading: false,
      form: { subject: '', totalAmount: '', body: '充值' },
      info: {},
      rules: {
      }
    }
  },
  watch: {
    url(newVal, oldVal) {
      if (newVal && this.newWin) {
        this.newWin.sessionStorage.clear()
        this.newWin.location.href = newVal
        // 重定向后把url和newWin重置
        this.url = ''
        this.newWin = null
      }
    }
  },
  mounted() {
    getCurrentCompany().then(res => {
      this.info = res.data
      this.form.subject = res.data.companyName;
    })
  },
  methods: {
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          toAliPayPcNew(this.form).then(res => {
            this.loading = false
            window.open(res.data);
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
