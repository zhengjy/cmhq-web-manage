<template>
  <div class="page">
    <div class="box">
      <!-- <div class="header">发货配置</div> -->
      <!-- 显示并编辑识别结果 -->

      <el-form ref="form" label-width="140px" inline size="small">
        <el-form-item label="当前：">
          <span :class="{ active: hobbydata.includes('1'), text: true }"
            >正向</span
          >
          <span :class="{ active: hobbydata.includes('2'), text: true }"
            >逆向</span
          >
        </el-form-item>
        <br />
        <el-form-item label="物品分类：">
          <el-select v-model="parsedData.courierOrderExtend.jtGoodsType">
            <el-option label="文件" value="bm000001"></el-option>
            <el-option label="数码产品" value="bm000002"></el-option>
            <el-option label="生活用品" value="bm000003"></el-option>
            <el-option label="食品" value="bm000004"></el-option>
            <el-option label="服饰" value="bm000005"></el-option>
            <el-option label="其他" value="bm000006"></el-option>
            <el-option label="生鲜类" value="bm000007"></el-option>
            <el-option label="易碎品" value="bm000008"></el-option>
            <el-option label="液体" value="bm000009"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="快递类型：">
          <el-select v-model="parsedData.billType">
            <el-option label="普通" value="00"></el-option>
            <el-option label="代收" value="01"></el-option>
            <el-option label="到付" value="02"></el-option>
            <el-option label="国际" value="03"></el-option>
            <el-option label="生鲜" value="04"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="是否带电：">
          <el-select v-model="parsedData.battery">
            <el-option label="未知" value="10"></el-option>
            <el-option label="带电" value="20"></el-option>
            <el-option label="不带电" value="30"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="物品类型：">
          <el-select v-model="parsedData.courierOrderExtend.goodsType">
            <el-option label="大件" value="大件"></el-option>
            <el-option label="小件" value="小件"></el-option>
            <el-option label="扁平件\文件" value="扁平件\文件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：" prop="goodsName">
          <el-select
            size="small"
            v-model="parsedData.goodsName"
            filterable
            placeholder="选择产品"
            style="width: 186px"
            @change="goodsNameChange"
          >
            <el-option
              :label="
                item.categoreCode
                  ? item.categoreCode + '-' + item.categoryName
                  : item.categoryName
              "
              :value="
                item.categoreCode
                  ? item.categoreCode + '-' + item.categoryName
                  : item.categoryName
              "
              v-for="(item, index) in categoryList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择发货地址：" v-if="hobbydata.includes('1')">
          <el-select
            size="small"
            v-model="selectAddressFrom"
            placeholder="选择发货地址"
            style="width: 600px"
            @change="toGetAddress('from')"
          >
            <el-option
              :label="item.name + '-' + item.mobile + '-' + item.address"
              :value="item.id"
              v-for="item in addressList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="发货地址智能识别：" prop="name">
          <el-input
            type="textarea"
            style="width: 600px; height: 110px"
            :rows="5"
            size="small"
            placeholder="请输入或粘贴文本，自动识别地址信息，格式：姓名+空格+电话+空格+分机号+空格+省市区详情地址"
            v-model="inputTextFrom"
            @blur="parseText('from')"
            addressList
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="发货人：" prop="fromName">
          <el-input
            v-model="parsedData.fromName"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货人手机号：" prop="fromMobile">
          <el-input
            v-model="parsedData.fromMobile"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货分区号：" prop="fromPartitionNumber">
          <el-input
            v-model="parsedData.fromPartitionNumber"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="发货省：" prop="fromProv">
          <el-input v-model="parsedData.fromProv" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="发货市：" prop="fromCity">
          <el-input v-model="parsedData.fromCity" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="发货区/县：" prop="fromArea">
          <el-input v-model="parsedData.fromArea" style="width: 186px"></el-input>
        </el-form-item> -->
        <el-form-item label="省市区：" prop="fromArea">
          <el-cascader
            size="small"
            :options="options"
            v-model="selectedFrom"
            @change="handleChangeFrom"
            style="width: 220px"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="发货具体地址：" prop="fromAddress">
          <el-input
            v-model="parsedData.fromAddress"
            type="textarea"
            :rows="1"
            size="samll"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="重量(必填):kg"
              prop="weight"
              label-width="100px"
              style="color: red"
            >
              <el-input
                v-model="parsedData.weight"
                type="number"
                placeholder="必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="宽度:cm" prop="width" label-width="80px">
              <el-input
                v-model="parsedData.width"
                type="number"
                placeholder="非必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="长度:cm" prop="height" label-width="80px">
              <el-input
                v-model="parsedData.height"
                type="number"
                placeholder="非必填"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="高:cm" prop="length" label-width="80px">
              <el-input
                v-model="parsedData.length"
                type="number"
                placeholder="非必填"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tips">
          包裹重量小体积大时按照体积计算重量，实际重量以快递员测量核实为准，点击设置体积测算体积重量，换算公式:体积重量=长x宽x高(cm)/8000
        </div>
        <el-form-item label="期望上门取件时间：" prop="time">
          <!-- <date-range-picker  type="datetimerange" v-model="parsedData.time" class="date-item" /> -->
          <QuickTime :value.sync="parsedData.time" />
        </el-form-item>
        <el-form-item label="备注：" prop="msg">
          <el-input
            v-model="parsedData.msg"
            type="textarea"
            :rows="1"
            size="samll"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 收货 -->
    <div class="box">
      <!-- <div class="header header-title">收货配置</div> -->
      <el-form ref="form" label-width="140px" inline size="small">
        <el-form-item label="选择收货地址：" v-if="hobbydata.includes('2')">
          <el-select
            v-model="selectAddressTo"
            placeholder="选择收货地址"
            style="width: 600px"
            @change="toGetAddress('to')"
          >
            <el-option
              :label="item.name + '-' + item.mobile + '-' + item.address"
              :value="item.id"
              v-for="item in addressList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="收货地址智能识别：" prop="name">
          <el-input
            type="textarea"
            style="width: 600px; height: 108px"
            :rows="5"
            v-model="inputTextTo"
            placeholder="请输入或粘贴文本，自动识别地址信息，格式：姓名+空格+电话+空格+分机号+空格+省市区详情地址"
            @blur="parseText"
            addressList
          ></el-input>
          <span class="tips-2"> 选择收货地址和智能识别2选1 </span>
        </el-form-item>
        <br />
        <el-form-item label="收货人：" prop="fromName">
          <el-input v-model="parsedData.toName" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货人手机号：" prop="toMobile">
          <el-input
            v-model="parsedData.toMobile"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货分区号：" prop="toPartitionNumber">
          <el-input
            v-model="parsedData.toPartitionNumber"
            style="width: 186px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="收货省：" prop="toProv">
          <el-input v-model="parsedData.toProv" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货市：" prop="toCity">
          <el-input v-model="parsedData.toCity" style="width: 186px"></el-input>
        </el-form-item>
        <el-form-item label="收货区/县：" prop="toArea">
          <el-input v-model="parsedData.toArea" style="width: 186px"></el-input>
        </el-form-item> -->
        <el-form-item label="收货省市区：" prop="toArea">
          <el-cascader
            size="small"
            :options="options"
            v-model="selectedTo"
            @change="handleChangeTo"
            style="width: 220px"
          >
          </el-cascader>
        </el-form-item>
        <el-row>
          <el-form-item label="收货具体地址：" prop="toAddress">
            <el-input
              v-model="parsedData.toAddress"
              type="textarea"
              :rows="1"
              style="width: 600px"
            ></el-input>
          </el-form-item>
        </el-row>
        <div class="agree-warp">
          <el-checkbox v-model="checkedAgree"></el-checkbox>&nbsp;&nbsp;我已理解并遵守<span
            @click="dialogVisible = true" class="link"
            >《服务协议》</span
          >
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="!checkedAgree"
            :loading="loading"
            >确定</el-button
          >
          <el-button type="primary" @click="getShareUrlAdd"
            >获取分享地址</el-button
          >
        </el-form-item>
      </el-form>
      <el-dialog
        title="服务协议"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <div class="agree-body">
          《快件服务协议》是京兔通达与您（以下简称“用户”）之间达成的快件寄递服务合同，附则、运单、隐私政策及京兔通达发布的各类规则、服务细则、说明、通知等为《快件服务协议》有效组成部分（以下统称为“本协议”），本协议在您下电子运单前通过勾选的形式在线签署。在线签署并下单后，即表示您已接受协议的全部内容，在您与京兔通达间发生法律效力。
          请您在务必仔细阅读、充分理解后再决定勾选并下单，尤其是以粗体、红色或下划线标识的条款，因这些条款可能会明确您应履行的义务或对您的权利有所限制。若您不同意本协议全部或任何内容，您应停止使用寄快递服务。如您对协议内容有任何疑问，您可随时联系我们。
          1、 说明 “快件”指单个运单中，京兔通达同意收寄的托寄物。 2、 您的义务
          2.1
          请您提交本人真实信息登录京兔通达账号，并妥善保管该等账号。通过您的账号进行的下单等操作行为视为您本人行为。您确认现场交付快件为您本人。若由他人代为交付您订单对应的快件，视为该第三人已获得您完全授权。
          2.2您需承诺您是托寄物的合法处置人，保证对货物享有所有权或独立处分权。
          2.3请您如实填写或提供运单所有信息，包括但不限于托寄物名称、性质、数量和价值，以及寄件人、收件人的名称、地址、联系电话，并保证该等资料都是真实、完整和准确的。特别提示：若如您填写的寄件人不是您本人，视为该人员是您完全授权的寄件人，代表您享有寄件人的权利和义务。您作为下单人与寄件人就您的订单承担连带责任，包括但不限于支付运费。
          2.4 您应确保快件在准备、寄递过程中京兔通达免受他人不当干扰。
          2.5您在交付寄递前需对托寄物进行妥善包装，尤其是内含易碎品、液体、气体等托寄物，您需提供充分的防破损、防漏、防爆措施，使托寄物适用于安全配送。若您自行提供快件封装用品和胶带的，您需严格遵守有关国家规定，不得违规使用禁止及限制使用的封装材料。
          2.6 遵守《禁止寄递物品管理规定》等法律法规的规定，不予寄递国家法律法规规定的禁止或限制寄递的物品，您可通过下单页面及本协议附录一、二查询禁限寄品。附录一、二为根据国家有关规定制定的禁止或限制寄递物品名录，若该等规范性法律文件发生变更，京兔通达将按有关国家机关发布及更新的最新规定为准提供服务。
          京兔通达在任何时候发现您交付的物品不符合禁止或限制寄递的物品的有关规定的，有权移交相关部门处理。
          2.7 托寄物需要办理审批、检验等手续的，您应向京兔通达提交办理完相关手续的证明文件。
          2.8 出示有效证件，以符合实名寄递的有关法律规定。 3、 京兔通达的义务
          出于安全及法律法规的要求，京兔通达有权对快件进行当场开箱验视及安全检查，对禁寄及拒绝验视的快件不予收寄。免生疑问，京兔通达不会对因上述查验而导致的任何延误造成的损失负责。
          京兔通达向寄件人提供自交寄之日起一年内的查询服务。 4、 费用
          4.1 快件服务的运费及附加服务费的计费标准以京兔通达所公示的当期计费标准为准，京兔通达可以根据市场环境的变化不时的合理变更价格，如有疑问您可以联系京兔通达对接人咨询。
          如地址不正确、联系方式错误、收件人拒收等原因而造成无法派送的快件，若您要求退回，则双程费用均由您承担。
          4.2 附加服务费
          您指示需要提供耗材包装、保价等附加服务费的时候，需额外增收增值服务费
          4.3 寄件人始终对所有费用承担主要责任。在寄件人指示由收件人或第三方付费的情况下，寄件人应向京兔通达支付收件人或第三方应支付但未支付的所有运费和其它费用。若京兔通达代表寄件人、收件人或任何第三方被要求缴纳税费，且京兔通达无法从相关人士收回该金额，寄件人将按要求支付该金额。
          4.5
           无法投递的快件，京兔通达会联系您处理，若您指示放弃货物，京兔通达取得该货物处置权限；若您指示退回，或7日内未明确指示弃货或退回，将对快件进行退回，退回运费由您承担。若由于您的原因造成快件无法退回的，京兔通达有权根据《无法投递又无法退回快件管理规定》等规范性法律文件进行相应操作及处置，因此产生的保管费、处置费等费用由您承担。不易保存的生鲜快件不支持转寄、退回，因非京兔通达原因导致自首次投递之日起3日内无法派送成功的，京兔通达有权将托寄物按作废件处理并不承担任何责任。
          4.6费用支付
          快件服务费用结算方式：选择寄付现结；寄付现结是指您需在每次账户下单
          系统会先冻结下单的预估金额 等订单签收后会再扣除实际的金额 5、
          保价与赔偿
          您理解并认同，京兔通达是按托寄物的计费重量收取运费，并非按托寄物的价值和预期收益收取运费，同时，京兔通达为您的货物提供保价服务，您可根据货物的实际价值和赔偿需求，自行评估是否选用。您已明确知晓：保价服务的选择与否对于货物毁损、灭失之后的赔付标准具有非常重要的意义。本着公平合理的原则，您同意以下保价与理赔规则：
          5.1保价服务
          5.1.1 京兔通达提供的保价服务，基于您的保价金额收取费用，对于金额超过一千元的贵重物品建议您选择保价服务，并遵循诚实信用的原则如实按照托寄物实际价值进行保价，京兔通达可为三十万元以下物品提供保价服务，保价手续费按照保价金额的一定比例收取,具体收取比例以京兔通达公示的当期标准为准。
          5.1.2 京兔通达对价值不易核实、易破损等物品不提供保价服务，详细规则以京兔通达公示的为准。
          5.1.3 为节约您的寄件时间，京兔通达对托运物价值采取“理赔审查”的方式，包括：
          a）您应在寄件时如实按照托运物的实际价值诚信保价；
          b）理赔时您应当提供托运物的真实有效价值证明（如发票，合同、付款凭证组合）及按照京兔通达要求提供相关资料（如包含运单号的外包装、内包装、填充物、及货物损坏情况的图片，以上关键要素在同一图片内）
          c）如您无法证明托运物的实际价值或双方对实际价值有争议的，京兔通达会结合市场价值或/和第三方机构意见评估损失价值，基于本协议约定进行赔偿。
          5.2 赔偿服务 5.2.1 因京兔通达原因，托运物发生丢失按以下标准进行赔偿：
          a) 若您使用“普通保价”增值服务且支付保价费用的，则本公司按照保价金额和损失的比例向您赔偿，最高不超过托运物的实际损失金额。
          b) 若您使用“全额保”增值服务且支付保价费用的，本公司将结合保价金额与实际损失金额进行全额赔偿，最高不超过保价金额；在快件出现部分损毁的情况下，本公司将根据您的意愿，结合保价金额及实际损失进行理赔，最高不超过托寄物的保价金额。
          c) 若您保价金额高于货物实际价值的，本公司赔付最高不超过托运物的实际价值；
          d）若您未选择任何保价，则京兔通达按该票毁损、灭失货物部分运费的九倍限额内赔偿托运物的实际损失，最高上限为1000元。如您认为该赔偿标准，不足以弥补您的损失，应根据托运物的实际价值选择等值的保价服务。
          5.2.2 京兔通达若对托寄物进行全额理赔后，托寄物尚有残值的，归京兔通达所有。如托寄物归您所有，京兔通达有权在全部赔偿金额中直接扣减托寄物残值后向您赔付。
          5.2.3 您选择签单返还服务时，若因京兔通达原因导致签收回单灭失的，京兔通达承担的责任仅限于免费提供一次对原有签单进行补全返还服务作为赔偿。
          5.2.4 特定托寄物赔付责任：
          特定托寄物理赔责任依据您签署的《特定托寄物理赔协议》进行理赔。
          5.2.5 索赔的时间要求：除非与相关适用法律冲突，任何索赔必须在京兔通达妥投托运物后的24小时内以书面方式向京兔通达提出并附上相应证明材料，否则京兔通达将不再承担任何责任。若所有快递服务费用尚未被支付，京兔通达无义务受理任何索赔。索赔金额不可用该快递服务费用抵消。作为理赔的条件，京兔通达有权对原托运物和包装材料进行检查。
          5.3 下列情形及导致的托运物毁损、灭失、延误派送、无法派送及其他损失的，京兔通达不承担赔偿责任：
          a) 因不可抗力因素造成的。“不可抗力”是指无法预测、无法控制或无法避免的客观因素或意外事件（保价件除外）；
          b) 其他外部因素造成的，包括但不限于地震、火灾、雪灾、暴风雨、大雾等恶劣天气；罢工、恐怖事件、疫情、意外交通事故、法规政策的修改、政府、司法机关的行为、决定或命令；抢劫、飞车抢夺等暴力犯罪（保价件除外）；
          c) 生鲜类物品在京兔通达展示的预计送达时效内送达，但送达时腐烂、损坏的；
          d) 生鲜类物品货物已当面验货签收，妥投24小时后您反馈货物损坏、腐烂、短少的；
          e) 因您不同意拆封托运物原销售包装，妥投时原包装无损且无拆封痕迹的，包装内物出现毁损、灭失、短少的；
          f) 您基于托运物可能获得的收益、实际用途、商业机会等任何间接损失；
          g) 因托运物的自然性质、内在缺陷或合理损耗造成的。
          h) 非京兔通达过错造成的，包括但不限于您没有如实申报托寄物资料，您交付的托运物属于法律法规明文规定及本合同约定禁止寄递或限制寄递的，您对托运物包装不当，收货人迟延受领托运物等情形。
          i) 其他法律规定或双方约定京兔通达免于赔偿的情形。 5.4
          理赔对象：京兔通达按本协议约定向您本人提供理赔服务。特别提示：在2.3条所述寄件人不是您本人时，若寄件人向京兔通达主张理赔的，视为您已全权授权寄件人。京兔通达理赔寄件人后，您不得就已理赔订单再次主张理赔。
          6、 签收
          京兔通达将快件投递至收件人地址和收件人或收件人（寄件人）允许的代收人，视为送达。若收件人在签收托运物时没有在运单记录上注明有任何损坏，则该托运物被视为完好送达。若无收件人姓名，仅有收货单位地址的，投递至单位地址，由单位收件人员签收，或盖单位收发章，视为送达。
          7、 时效 京兔通达服务产品的时效说明以京兔通达所公示的解释为准。 8、
          信息保护
          您同意遵守京兔通达所公示的隐私政策（https://www.jdl.cn/Protocol）及其不时修订的内容，同意京兔通达按照法律法规和隐私政策的规定处理您提供的运单信息。京兔通达为保护您的个人信息，可能使用保密运单，京兔通达会对您寄件时在京兔通达下单系统录入的信息予以保存。对于保密运单所隐匿的信息，您同意以京兔通达系统所查询的内容为准。
          您愿意接收京兔通达以电话、电子邮件、手机短信等方式告知、发送的产品/业务介绍、推广促销信息及其他商业性信息。
          9、 法律适用
          本契约条款未约定或约定不明，且双方未达成补充约定的，按照中华人民共和国相关法律法规和国家标准的规定执行。
          10、争议管辖
          本条款履行过程中如发生争议，双方应友好协商解决。如协商不成的，应向快件寄出地有管辖权的人民法院提起诉讼。
          附录一： 禁止寄递物品指导目录：： 一、枪支（含仿制品、主要零部件）弹药
          1．枪支（含仿制品、主要零部件）：如手枪、步枪、冲锋枪、防暴枪、气枪、猎枪、运动枪、麻醉注射枪、钢珠枪、催泪枪等。
          2．弹药（含仿制品）：如子弹、炸弹、手榴弹、火箭弹、照明弹、燃烧弹、烟幕（雾）弹、信号弹、催泪弹、毒气弹、地雷、手雷、炮弹、火药等。
          二、管制器具
          1．管制刀具：如匕首、三棱刮刀、带有自锁装置的弹簧刀（跳刀）、其他相类似的单刃、双刃、三棱尖刀等。
          2．其他：如弩、催泪器、催泪枪、电击器等。 三、爆炸物品
          1．爆破器材：如炸药、雷管、导火索、导爆索、爆破剂等。
          2．烟花爆竹：如烟花、鞭炮、摔炮、拉炮、砸炮、彩药弹等烟花爆竹及黑火药、烟火药、发令纸、引火线等。
          3．其他：如推进剂、发射药、硝化棉、电点火头等。
          四、压缩和液化气体及其容器
          1．易燃气体：如氢气、甲烷、乙烷、丁烷、天然气、液化石油气、乙烯、丙烯、乙炔、打火机等。
          2．有毒气体：如一氧化碳、一氧化氮、氯气等。
          3．易爆或者窒息、助燃气体：如压缩氧气、氮气、氦气、氖气、气雾剂等。
          五、易燃液体
          如汽油、柴油、煤油、桐油、丙酮、乙醚、油漆、生漆、苯、酒精、松香油等。
          六、易燃固体、自燃物质、遇水易燃物质
          1．易燃固体：如红磷、硫磺、铝粉、闪光粉、固体酒精、火柴、活性炭等。
          2．自燃物质：如黄磷、白磷、硝化纤维（含胶片）、钛粉等。
          3．遇水易燃物质：如金属钠、钾、锂、锌粉、镁粉、碳化钙（电石）、氰化钠、氰化钾等。
          七、氧化剂和过氧化物
          如高锰酸盐、高氯酸盐、氧化氢、过氧化钠、过氧化钾、过氧化铅、氯酸盐、溴酸盐、硝酸盐、双氧水等。
          八、毒性物质
          如砷、砒霜、汞化物、铊化物、氰化物、硒粉、苯酚、汞、剧毒农药等。
          九、生化制品、传染性、感染性物质
          如病菌、炭疽、寄生虫、排泄物、医疗废弃物、尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等。
          十、放射性物质 如铀、钴、镭、钚等。 十一、腐蚀性物质
          如硫酸、硝酸、盐酸、蓄电池、氢氧化钠、氢氧化钾等。
          十二、毒品及吸毒工具、非正当用途麻醉药品和精神药品、非正当用途的易制毒化学品
          1．毒品、麻醉药品和精神药品：如鸦片（包括罂粟壳、花、苞、叶）、吗啡、海洛因、可卡因、大麻、甲基苯丙胺（冰毒）、氯胺酮、甲卡西酮、苯丙胺、安钠咖等。
          2．易制毒化学品：如胡椒醛、黄樟素、黄樟油、麻黄素、伪麻黄素、羟亚胺、邻酮、苯乙酸、溴代苯丙酮、醋酸酐、甲苯、丙酮等。
          3．吸毒工具：如冰壶等。 十三、非法出版物、印刷品、音像制品等宣传品
          如含有反动、煽动民族仇恨、破坏国家统一、破坏社会稳定、宣扬邪教、宗教极端思想、淫秽等内容的图书、刊物、图片、照片、音像制品等。
          十四、间谍专用器材
          如暗藏式窃听器材、窃照器材、突发式收发报机、一次性密码本、密写工具、用于获取情报的电子监听和截收器材等。
          十五、非法伪造物品 如伪造或者变造的货币、证件、公章等。
          十六、侵犯知识产权和假冒伪劣物品
          1．侵犯知识产权：如侵犯专利权、商标权、著作权的图书、音像制品等。
          2．假冒伪劣：如假冒伪劣的食品、药品、儿童用品、电子产品、化妆品、纺织品等。
          十七、濒危野生动物及其制品 如象牙、虎骨、犀牛角及其制品等。
          十八、禁止进出境物品
          如有碍人畜健康的、来自疫区的以及其他能传播疾病的食品、药品或者其他物品；内容涉及国家秘密的文件、资料及其他物品。
          十九、特殊物品
          （1）医药类物品：无完整销售包装，药品有温度等特殊要求等；医学检测类物品不作揽收；
          （2）法律法规禁止寄递的活体动物； （3）现金及货币；
          （4）国家机关公文； 二十、其他物品
          《危险化学品目录》《民用爆炸物品品名表》《易制爆危险化学品名录》《易制毒化学品的分类和品种目录》《中华人民共和国禁止进出境物品表》载明的物品和《人间传染的病原微生物名录》载明的第一、二类病原微生物等，以及危害国家安全、扰乱社会秩序、破坏社会稳定的各类物品；危及寄递安全的爆炸性、易燃性、腐蚀性、毒害性、感染性、放射性等各类物品；法律、行政法规、国务院和国务院有关部门规定禁止寄递的其他物品。
          附录二： 空运违禁品寄递物品指导目录 一、植物类
          花木/草/树等各种植物,（鲜花仅快递产品支持揽收） 二、易燃易爆物品
          喷雾器,自喷漆,导火索,鞭炮/礼炮,发令纸,火药,拉炮,雷管,礼花,煤气罐,煤气瓶,摔炮,烟火制品,烟花,爆竹,炸药,密封罐,石油,溶剂油,汽油,煤油,柴油,石蜡,沥青等
          三、易腐蚀
          电池液（酸性的）,苛性钠,硫酸，盐酸、硝酸，有液蓄电池，汽车用蓄电池,无机液体粘合剂,酸铅蓄电池,王水，苛性钠，氢氧化钠、氢氧化钾等
          四、医疗用品及药品
          血液/血浆,血液循环器,血液流动测试器,胶囊,药品,碘酒,试剂,疫苗,医药试剂,鹿茸粉,鹿茸（新鲜鹿茸）,医疗仪器,氧气随身瓶,医用氧气瓶等
          五、液体类
          饮料饮品,矿泉水,冰茶,奶茶,可乐,果粒橙,汽水,红牛,雪碧,苏打水,冷鲜奶,酸奶,奶昔,苹果醋,冰沙,果汁,豆奶,豆浆,牛奶,红茶,绿茶,柚子茶,蜂蜜,着色剂,水,不明液体等
          六、香烟类 烟叶,烟丝,香烟等 七、文体用品
          足球,篮球,排球,皮球,网球,高尔夫球,橄榄球,胶片,弓箭,仿真玩具枪,墨粉盒,碳带,打印机碳带,玩具枪,模型枪,印泥,公章,空弹壳工艺品,美工刀,美工刀片,玩具刀,模型刀,乒乓球等
          八、水果类 榴莲, ,西瓜等有强烈刺激性味道的水果或易碎水果 九、食品类
          乳制品,炼乳,奶油,干酪类,乳糖,乳清粉,动物饲料,粽子,冰冻食品,奶精,罐头食品,调味料/调料,食盐,白糖,味精,白醋,生姜,大蒜,虾夷葱,香芹等
          十、生鲜类
          甲鱼、各种生鲜冷冻肉制品，生鲜冷冻牛排，各种生鲜冷冻肉类需提供检疫证明以及法律法规规定要求的其他证明（若有）方可寄递。
          十一、日化用品
          腮红,保湿水,眼线液,防晒油,眼影,隐形眼镜护理液,眼药水,生理食盐水,防蚊液,花露水,染发剂,洗发剂,烫发剂,直发剂,定型剂,焗油膏,护发乳,发膜/发蜡,指甲油等
          十二、气体类
          充气娃娃,水煤气,救生衣,婚庆礼花筒,灯泡,灯管,节能灯,灯管,疝气灯等
          十三、酒类 啤酒,葡萄酒,药酒,红酒,自酿酒/散酒,白酒,洋酒等
          十四、家饰、家电 空调、冰箱等压缩机,电音响/音箱,床垫 十五、机械类
          整装汽车,点火系统,千斤顶,液压钳,液压工具 十六、化学物品
          石油树脂,疏浚泥,热熔胶,漂白剂,防滑剂,肥料,尿素,水泥,软化剂,热熔胶条等
          十七、膏状物类 硅胶,玻璃胶,皮革清洁膏,皮衣护理油膏,电子数码管石墨乳等
          十八、粉末类/颗粒类
          塑料粒,滑石粉,石膏粉,色粉,奶粉/乳粉,咖啡粉/卡布奇诺,蛋白粉/蛋白质粉,干燥剂,其他粉末,其他颗粒,木炭粉,除湿剂,除湿颗粒,粉状物,鱼粉,去污粉等
          十九、放射性的物品及各种危险品 放射线物质,
          夜光粉铈-114,钚-239,锶-90,碘-131,铯-137,钌-106,铑-106,铁-55,锰-54,锌-65,钴-60,等
          二十、电子产品类
          电子表,行车记录仪,电脑,相机,摄像机,VCD,SVCD,DVD,录像机,摄录机,收音机,收录机,电唱机,激光唱机/CD,家庭办公设备,家用电子保健设备,汽车电子产品,复读机,点读机,电子辞典/掌上电脑,游戏机,光碟,录像带,蓝牙耳机,电动剃须刀,电子蜡烛,点烟器,机箱电源,激光电源,计算器冷却器,电子烟,移动电源/充电宝,三星GALAXY
          NOTE 7 二十一、电池类
          手机,蓄电池,碱性的电池液,化学电池,液体电池,铅酸电池,燃料电池等
          二十二、工具刀具类
          黄油枪,手用锯条,钢锯,电钻,轮胎充气泵、剃须刀片,水果刀,菜刀,餐具类刀具,餐具刀叉,军刀,日本军刀,指挥刀,瑞士军刀,剪刀,园艺剪刀,高枝剪刀,园林修枝剪刀等
          二十三、磁性物品
          磁条,磁铁,喇叭,门铃,其他带磁物品,音响/音箱,电磁铁,四氧化三铁,电磁铁等
          二十四、其他
          其他会威胁航空飞行安全以及法律、行政法规、国务院和国务院有关部门、航司规定禁止寄递的其他物品等
          附录三： 用户行为规范说明
          用户通过京兔通达小程序操作的各种行为，应符合法律法规规定、依法遵守以下规范
          一、     用户不得制作、传输或发表以下违法信息资料：
          （一）反对宪法所确定的基本原则，煽动抗拒、破坏宪法和法律法规实施的；
          （二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的，煽动推翻社会主义制度的；
          （三）损害国家荣誉和利益的；
          （四）歪曲、丑化、亵渎、否定英雄烈士事迹和精神，侵害英雄烈士的姓名、肖像、名誉、荣誉的；
          （五）宣扬或煽动实施恐怖主义、极端主义及其活动的；
          （六）煽动民族仇恨、民族歧视、破坏民族团结的言论；
          （七）破坏国家宗教政策，宣扬邪教和封建迷信的；
          （八）散布谣言，扰乱经济秩序和社会秩序的；
          （九）散布淫秽、色情、暴力或者教唆犯罪的；
          （十）侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；
          （十一）法律、行政法规禁止的其他内容。
          二、     用户应防范和抵制制作、复制、发布含有下列内容的不良信息资料：
          （一）标题严重夸张，发表内容与标题严重不符的；
          （二）不当评述自然灾害、重大事故等灾难的；
          （三）煽动人群歧视、地域歧视等的； （四）宣扬低俗、庸俗、媚俗内容的；
          （五）违反社会公德行为的； （六）侵犯未成年人合法权益的；
          （七）其他对网络生态造成不良影响的内容。
          三、用户须对自己在网上的言论和行为承担法律责任，若在平台上散布和传播反动、色情或其它违反国家法律的信息，京兔通达有权依据注册协议、平台规则等采取相应处理措施。
          附录四： 增值服务附录——代收货款服务协议
          本服务条款是基于寄件人（以下或简称您）与京兔通达达成《快件服务协议》，并就代收货款增值服务达成的补充协议（以下简称本服务条款），请您仔细阅读，若您选择使用代收货款服务即受本服务条款约束，若您未选择使用代收货款服务，不受本服务条款约束。京兔通达有权对本协议内容进行变更，若您在本协议内容变更后继续使用本服务，表示您已充分阅读、理解并接受修改后的条款内容；若您不同意本协议或修改后的条款内容，您应停止使用本服务。
          1、  说明
          1.1  “京兔通达”指北京京邦达贸易有限公司及其关联公司，并依据本协议为您提供代收货款服务。本协议的缔约主体是您与寄件地的北京京邦达贸易有限公司及子公司、分公司、关联公司。
          1.2  代收货款服务是指京兔通达按照您与收件人之间达成的交易协议，向您提供快递服务同时并代您向收件人收取货款，并按照双方约定时间将货款返至您指定账户，同时向您收取代收货款服务费的增值服务。
          2、  寄件人权利与义务
          2.1 您委托京兔通达代收货款的托寄物须符合国家法律规定、合法销售、承担质量保证及售后服务承诺义务。您因托寄物与收件人或第三方之间发生的交易纠纷由发生争议的双方自行解决。您未妥善解决纠纷，导致收件人或第三方对托寄物采取保全措施（如扣留托寄物）而造成的损失由您承担，如给京兔通达造成损失的，您应负责赔偿。
          2.2 您委托京兔通达代为收取货款的，须在面单上清晰、准确的填写收款信息且确保其与实际需代收货款金额一致。您委托京兔通达提供所代收货款服务的快件每份面单对应的代收货款金额不超过人民币30万元。因第三方原因导致京兔通达未完成代收款工作的，京兔通达应及时向您反馈情况并积极协助您向付款义务人追讨。
          2.3 收件人在付款前有权拆开包装对货物外观及数量检验，如收件人在验货后决定拒绝接受托寄物或者拒绝付款的，您不得以收件人曾拆开包装为由拒绝收回货物，亦不得以此为由追究京兔通达的任何责任，同时，京兔通达按您要求逆向退回的，由您承担退回的运费。
          2.4 您与收件人或第三方存在买卖等商业交易关系的，收件人或第三方对于托寄物提出售后等相关问题，或基于有关法律法规及合同约定要求退换托寄物的及/或提出退款申请的，您应积极与收件人或第三方协商处理并达成一致。如您未及时处理，导致收件人或第三方投诉至京兔通达，自京兔通达通知您后5日内仍未妥善处理的，或收件人或第三方投诉对京兔通达名誉或品牌造成威胁或损害的（以京兔通达判断为准），京兔通达有权代您退款。但并不表示京兔通达对您的商品的质量保证及其售后服务承担责任，京兔通达仅对托寄物寄递、代收货款等物流服务负责。针对该情形下的退货的运费由您承担，但您与退货方协商一致由退货方承担的除外。
          2.5 应指定人员负责与京兔通达进行对接，负责处理与京兔通达日常事务对接、及时处理投诉至京兔通达的您与收件人或第三方的售后服务等交易纠纷。
          2.6 京兔通达已安排两次配送，但由于非京兔通达原因（包括但不限于收件人拒收、联系不上收件人、收件人信息有误等）造成仍未成功妥投的托寄物的，您如需京兔通达提供再次投递服务的，满足条件后可选择京兔通达协商再投收费增值服务。
          2.7 您已知悉并确认，使用快递面单上寄件人联系方式、双方协议或您书面授权的联系方式、您在京兔通达系统登记的联系方式向京兔通达提出取消或更改托寄物代收货款金额的需求，视为您授权行为，因此产生的电话录音、电子邮件、系统操作等均视为您取消或更改代收货款金额的依据。
          3、 代收货款服务费与结算 3.1 代收货款的结算：
          京兔通达有权向您收取代收货款服务费，您同意京兔通达直接从代收货款中扣除服务费。
          3.2 代收货款服务费标准：您同意按照京兔通达上公布的费用标准向京兔通达支付相应的服务费用。您同意京兔通达有权根据经营需要对价格进行调整，并按照最新价格进行结算。
          3.3 结算周期：支持“T+
          3”返款方式，双方对账完成后进行返款，如遇节假日返款时间顺延。
          3.4 您应在系统中填写您的代收货款返款接收账户：
          ▲您应保证其提供的户名、开户银行、账号等信息真实准确，如您账号变更或发生不可用等情况出现时，您应及时书面通知京兔通达并确认京兔通达获悉，否则因此引起的延期付款、转账错误或无法转账，京兔通达不承担任何责任，若因此造成京兔通达损失的，您应当赔偿京兔通达损失。
          ▲您代收货款返款接收账户应为您本人的对公账户；如您指定代收货款返款账户非您对公账户，需出具授权书说明收款账户与您的关系。
          3.5 京兔通达有权自应付您代收货款中扣除您未支付物流服务费、京兔通达代您退款费用、违约金等费用后，将剩余款项支付您。如您代收返还货款不足以抵扣上述费用时，您需另行向京兔通达支付。
          4、 其他
          本协议未涉及的内容，仍按您与京兔通达达成《快件服务协议》的约定执行。
          附录五： 增值服务附录——改址服务协议
          本服务条款是基于寄件人（以下或简称您）与京兔通达达成《快件服务协议》，并就改址服务增值服务达成的补充协议（以下简称本服务条款），请您仔细阅读，若您选择使用改址服务即受本服务条款约束，若您未选择使用改址服务，不受本服务条款约束。京兔通达有权对本协议内容进行变更，若您在本协议内容变更后继续使用本服务，表示您已充分阅读、理解并接受修改后的条款内容；若您不同意本协议或修改后的条款内容，您应停止使用本服务。
          1、 定义
          改址服务是指京兔通达将快件由运单收件地址转寄到收寄件人另行指定的收件地址的增值服务。
          2、 改址服务说明及费用标准
          您认可京兔通达有权调整上述费用标准，且您同意按照下单时展示的费用标准支付，如您有异议，应停止使用改址服务，您继续使用改址服务视为接受。
          改址类型说明：
          同城同站：收件地址修改前后在同一城市，且由京东同一营业部进行派送。
          同城跨站：收件地址修改前后在同一城市，但是不由京东同一营业部进行派送。
          跨城：收件地址修改前后不在同一城市。 3、 其他
          本协议未涉及的内容，仍按您与京兔通达达成《快件服务协议》的约定执行。
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="checkedAgreeHandle"
          >同意并继续</el-button>
        </span>
      </el-dialog>
      <Dig ref="dig" @ok="toSubmit" />
    </div>
  </div>
</template>
<script>
import Dig from "./dig.vue";
import DateRangePicker from "@/components/DateRangePicker";
import QuickTime from "@/components/QuickTime";

import {
  getCourierFreightCharge,
  addressAnalysis,
  getAddressList,
  createCourierOrder,
  getShareUrlAdd,
  getCurrentCompany,
  getCategoryList,
} from "@/api/cexpressorder/sendServer/index";
import { pcaTextArr } from "@/utils/area/index";
export default {
  name: "addsOrder",
  components: {
    Dig,
    DateRangePicker,
    QuickTime,
  },
  data() {
    return {
      loading: false,
      checkedAgree: false,
      dialogVisible: false,
      inputTextTo: "",
      inputTextFrom: "",
      addressList: [],
      categoryList: [],
      selectAddressTo: "",
      selectAddressFrom: "",
      options: pcaTextArr,
      selectedFrom: [],
      selectedTo: [],
      hobbydata: [],
      parsedData: {
        // billType: '00',
        // battery:  '10',
        time: [],
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
        weight: null,
        width: null,
        length: null,
        height: null,
        courierOrderExtend: {
          goodsType: "小件",
          jtGoodsType: "bm000001",
        },
      },
    };
  },
  mounted() {
    getCategoryList({ pageNo: 1, pageSize: 10000 }).then((res) => {
      console.error("categoryName", res.data);
      const result = res.data;
      this.categoryList = result.items;
    });
    getCurrentCompany().then((res) => {
      this.hobbydata = JSON.parse(res.data.hobbydata);
      console.error("this.hobbydata", this.hobbydata);
    });
    getAddressList({ pageNo: 1, pageSize: 1000 }).then((res) => {
      console.error("result", res.data);
      const result = res.data;
      this.addressList = result.items;
    });
  },
  methods: {
    checkedAgreeHandle() {
      this.checkedAgree = true;
      this.dialogVisible = false;
    },
    getShareUrlAdd() {
      let url = "";
      getShareUrlAdd({}).then((res) => {
        url = `${location.origin}/mngall/#/outServeAdds?companyId=${res.data.companyId}&userId=${res.data.userId}&orderNo=${res.data.orderNo}`;
        window.open(url);
      });
    },
    getPayShareUrlAdd() {
      let url = "";
      getShareUrlAdd({}).then((res) => {
        console.error("result", res.data);
        url = `${location.origin}/mngall/#/outServeAdds?companyId=${res.data.companyId}&userId=${res.data.userId}&orderNo=${res.data.orderNo}`;
        window.open(url);
      });
    },
    parseText(type) {
      let text = "";
      if (type === "from") {
        text = this.inputTextFrom;
      } else {
        text = this.inputTextTo;
      }
      addressAnalysis({ text: text }).then((res) => {
        const result = JSON.parse(res.data);
        console.error("result", JSON.parse(res.data));
        if (type === "from") {
          this.parsedData.fromName = result.person;
          this.parsedData.fromMobile = result.phonenum;
          this.parsedData.fromProv = result.province;
          this.parsedData.fromCity = result.city;
          this.parsedData.fromArea = result.county || result.town;
          this.parsedData.fromAddress = result.detail;
          this.selectedFrom = [
            result.province,
            result.city,
            this.parsedData.fromArea,
          ];
        } else {
          this.parsedData.toName = result.person;
          this.parsedData.toMobile = result.phonenum;
          this.parsedData.toProv = result.province;
          this.parsedData.toCity = result.city;
          this.parsedData.toArea = result.county || result.town;
          this.parsedData.toAddress = result.detail;
          this.selectedTo = [
            result.province,
            result.city,
            this.parsedData.toArea,
          ];
        }
      });
    },
    handleChangeFrom(value) {
      this.parsedData.fromProv = value[0];
      this.parsedData.fromCity = value[1];
      this.parsedData.fromArea = value[2];
      console.log("handleChangeFrom", value);
    },
    handleChangeTo(value) {
      this.parsedData.toProv = value[0];
      this.parsedData.toCity = value[1];
      this.parsedData.toArea = value[2];
      console.log("handleChangeTo", value);
    },
    toGetAddress(type) {
      console.error("type", type, this.selectAddressFrom);
      if (type === "from") {
        let data;
        this.addressList.forEach((item) => {
          if (item.id === this.selectAddressFrom) {
            data = item;
          }
        });
        this.parsedData.fromName = data.name;
        this.parsedData.fromMobile = data.mobile;
        this.parsedData.fromProv = data.province;
        this.parsedData.fromCity = data.city;
        this.parsedData.fromArea = data.area;
        this.parsedData.fromAddress = data.address;
        this.selectedFrom = [data.province, data.city, data.area];
      }
      if (type === "to") {
        let data;
        this.addressList.forEach((item) => {
          if (item.id === this.selectAddressTo) {
            data = item;
          }
        });
        this.parsedData.toName = data.name;
        this.parsedData.toMobile = data.mobile;
        this.parsedData.toProv = data.province;
        this.parsedData.toCity = data.city;
        this.parsedData.toArea = data.area;
        this.parsedData.toAddress = data.address;
        this.selectedTo = [data.province, data.city, data.area];
      }
    },
    goodsNameChange(data) {
      this.categoryList.forEach((item) => {
        if (
          item.categoryName === data ||
          item.categoreCode + "-" + item.categoryName === data
        ) {
          this.parsedData.weight = item.weight;
          this.parsedData.height = item.height;
          this.parsedData.length = item.length;
          this.parsedData.width = item.width;
        }
      });
    },
    onSubmit() {
      this.loading = true;
      getCourierFreightCharge({
        ...this.parsedData,
        takeGoodsTime: this.parsedData.time[0],
        takeGoodsTimeEnd: this.parsedData.time[1],
      })
        .then((res) => {
          this.loading = false;
          console.error(" this.$refs.dig", this.$refs.dig);
          this.$refs.dig.showDialog(res.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toSubmit() {
      createCourierOrder({
        ...this.parsedData,
        takeGoodsTime: this.parsedData.time[0],
        takeGoodsTimeEnd: this.parsedData.time[1],
      }).then((res) => {
        console.error("result", res.data);
        this.$router.push({ path: "/cexpressorder/list" });
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.page {
  padding: 20px 20px 200px;
  background-color: rgba(241, 244, 246);
  .box {
    max-width: 1405px;
    margin: 0 auto;
    .header {
      font-size: 20px;
      font-weight: bold;
      padding: 16px;
    }
    .header-title {
      padding: 0px 16px 16px 16px;
    }
    .tips {
      font-size: 14px;
      color: #f00;
      padding: 0px 0px 20px 80px;
    }
    .tips-2 {
      font-size: 14px;
      color: #f00;
      padding: 0px 0px 0px 0px;
      vertical-align: top;
    }
  }
  .agree-body {
    max-height: 400px;
    overflow-y: scroll;
  }
  .agree-warp {
    font-size: 14px;
    padding: 12px 0;
    .link {
      cursor: pointer;
      color: #1890ff;
    }
  }

  ::v-deep label[for="weight"] {
    color: red;
  }
  .active {
    display: inline-block;
    background-color: #42b983;
    color: #fff !important;
    border-color: #42b983;
    padding: 0px 10px;
    margin-right: 10px;
  }
  .text {
    color: #1890ff;
  }
}
</style>
