<template style="overflow: auto; height: 70%; ">
  <el-dialog
    title="计费规则"
    :visible.sync="dialogVisible"
    width="60%"
    custom-class="scroll-dialog"
  >
    <div style="text-align: center" >
      <el-image :src="require('../../../assets/images/bill_rule/3.png')" style="width: 700px"></el-image>

    </div>
    <div class="agree-body"  >
      <h3 style="color: red;">一、快件计价逻辑</h3>
      <p>"采用首续重计价方式"。</p>
      <p>计费公式 ：首重费用+【实际重量（向上取整）-1】*续重费用=实际费用</p>
      <p>结算重量【按实际重与体积重（计泡重）两者取最大值计算运费】"</p>

      <h3>二、快件重量计算方法</h3>
      <p>托寄物计费重量: 取体积重量与实际重量两者中较大值；
        <span style="color: red;font-weight:bolder;">体积重量=长(cm)×宽(cm)×高(cm)÷轻抛系数；</span></p>
      <p>【京东标快：<span style="color: blue;">快递B2C</span>】体积重量=长(cm)x宽(cm)x高(cm)÷8000</p>
      <p>【特快重货：<span style="color: blue;">快运B2C</span>】体积重量=长(cm)x宽(cm)x高(cm)÷6000</p>

      <h3>三、计费重量进位制规则</h3>
      <p>首重不足1kg的，按1kg计算；续重以1kg为计费单位，不足1kg,按1kg计算。 </p>
      <h3>四、重量是否含包装</h3>
      <h3>五、运费计算结果处理规则</h3>
      <p>运费进位制规则：运费计算结果按四舍五入取整数值。不足首重起始重量的，按首重价格收取；运费计算结果以元为单位。</p>
      <p style="font-weight:bolder;">以上计费规则可能因地区不同产品不同产生差异，最终以账单为准，如有疑问请联系对接人进行咨询。</p>


      <h2 style="color: red;">特别提醒！！！</h2>

      <p style="font-weight:bolder;">1、结算方式：直接账号充值，先充值后下单。</p>
      <p>账户下单 系统会先冻结下单的预估金额 等订单签收后会再扣除实际的金额</p>
      <p style="font-weight:bolder;">2、响应时间：下单选择预约取件时间，一般下单成功后24h内就会有取件员联系寄件人取件</p>
      <p style="font-weight:bolder;">3、什么快递：目前接入的有京东、极兔快递。</p>

      <p>创建订单成功后系统是根据取件的最优时效来匹配快递取件</p>
      <p style="font-weight:bolder;">4、包裹重量/体积限制：</p>
      <p>
        <span style="font-weight:bolder;">
          <span style="color: blue"> A、快递包裹/件【快递B2C】</span>当一单快递货中，任一包裹满足以下任意一个条件：①最长边大于1.6米；②计费重量大于50KG，即认定为超长超重货，该单货物将在原收费基础上加收超长超重费。加收标准按照：计费重量1元/kg计算，最低加收20元/票。
        </span>
        列如：一单的结算重量（体积重和实际重取最大）是5kg，但是包裹单边长大于1.6m 就需要收20元超长超重费；一单结算重量（体积重和实际重取最大）是51kg，就需要收51元超长超重费。
      </p>
      <p>
        <span style="font-weight:bolder;">
          <span style="color: blue">B、快递包裹/票【快运B2C】</span>当一票快运货中，任意一件货物满足以下任意一个条件：①最长边大于3.1米小于等于4米；②三边和大于5.5米小于等于6.3米；③最重件大于300KG小于等于1000KG，即认定为超长超重货，该票货物将在原收费基础上加收超长超重费。加收标准按照整票货物的计费重量*0.2元/KG计算，最低加收20元/票，最高加收500元/票。
        </span>
      </p>
      <p style="font-weight:bolder;">5、盲区：支持全国上门取件，个别偏远农村地区会不支持取件哦~</p>
      <p style="font-weight:bolder;">6、售后类型：<span style="color: red">我们这个业务是保丢不保损的，使用我们系统下单默认商家是愿意签署保丢不保损的免赔协议。请知悉~</span></p>
      <p >列如：一单的结算重量（体积重和实际重取最大）是5kg，但是包裹单边长大于1.6m 就需要收20元超长超重费；一单结算重量（体积重和实际重取最大）是51kg，就需要收51元超长超重费。</p>
      <p style="font-weight:bolder;">7、发票问题：<span style="color: red">我们这个开票费用是不含税金额，开票的话是充值金额另外加6%税金。</span></p>
      <p style="font-weight:bolder;">8、附加增值费用：<span style="color: blue">包装费服务按照京东官方标准收费。不同纸箱收费标准不一样，包装服务纸箱1-6号箱分别是1-6块钱，京东官网这个都是可以查询到的，具体如下</span></p>
      <el-image :src="require('../../../assets/images/bill_rule/1.png')"></el-image>
      <el-image :src="require('../../../assets/images/bill_rule/2.png')"></el-image>

      <p style="color: #0055aa">提示：京东的纸箱包装费都是快递揽收的时候根据实际情况包装和收费的，列如：如果因为当时站点没有合适的纸箱，可能也会采用临近的纸箱给包装上，所以最后可能相同产品结算的包装费也不一样哦~ </p>
      <p style="font-weight:bolder;color: red;">正常下单的时候这个包装费都是默认可以提供包装的；如果您后面不需要包装，可以下单备注下不需要提供包装服务哦~</p>
    </div>
  </el-dialog>
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
    showDialog() {
      this.dialogVisible = true;
    }
  }

}

</script>
<style>
.scroll-dialog {
  max-height: 60%; /* 设置最大高度 */
  overflow: auto; /* 或者使用 overflow: scroll; */
}
</style>
