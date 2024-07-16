<template>
  <div class="time-page">
    <el-input v-model="showTime"  placeholder="请选择日期"
    class="time-input"
    suffix-icon="el-icon-date"
    @focus="show = true"
    ></el-input>
    <div v-show="show" class="time-show">
      <div class="tab-warp">
      <div
        class="item-warp"
        v-for="(item, index) in day"
        :key="index"
        @click="tabClick(item)"
      >
        <div :class="{ 'item': true, item: true, active: item.active }">
            <div>{{ item.text }}</div><div>{{ item.time }}</div>
       </div>
    </div>
    </div>
    <div
     class="item-warp time"
      v-for="(item, index) in time"
      :key="index"
      @click="timeClick(item)"
    >
      <div  :class="{ 'item': true, item: true, active: item.active }">{{ item.text }}</div>
    </div>
    <div class="op-warp">
      <el-button size="small" type="primary" @click="del">清除</el-button>
      <el-button size="small" type="primary" @click="check">确认</el-button>
    </div>
   </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
dayjs.locale('zh-cn');
const currentDayIndex = dayjs().day();
const weekDaysCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const day = [
  {
    text: "今天",
    active: true,
    time: dayjs().format("YYYY-MM-DD"),
  },
  {
    text: "明天",
    active: false,
    time: dayjs().add(1, 'day').format("YYYY-MM-DD")
  },
  {
    text: "后天",
    active: false,
    time: dayjs().add(2, 'day').format("YYYY-MM-DD")
  },
  {
    text: weekDaysCN[currentDayIndex + 3],
    active: false,
    time: dayjs().add(3, 'day').format("YYYY-MM-DD")
  },
  {
    text: weekDaysCN[currentDayIndex + 4],
    active: false,
    time: dayjs().add(4, 'day').format("YYYY-MM-DD")
  },
  {
    text: weekDaysCN[currentDayIndex + 5],
    active: false,
    time: dayjs().add(5, 'day').format("YYYY-MM-DD")
  },
  {
    text: weekDaysCN[currentDayIndex + 6],
    active: false,
    time: dayjs().add(6, 'day').format("YYYY-MM-DD")
  },
];
const time = [
  {
    text: "09:00-10:00",
    active: true,
  },
  {
    text: "10:00-11:00",
    active: false,
  },
  {
    text: "11:00-12:00",
    active: false,
  },
  {
    text: "12:00-13:00",
    active: false,
  },
  {
    text: "13:00-14:00",
    active: false,
  },
  {
    text: "14:00-15:00",
    active: false,
  },
  {
    text: "15:00-16:00",
    active: false,
  },
  {
    text: "17:00-18:00",
    active: false,
  },
  {
    text: "19:00-20:00",
    active: false,
  },
  {
    text: "20:00-20:30",
    active: false,
  },
];
export default {
  name: "QuickTime",
  props: ['value'],
  data() {
    return {
      day,
      time,
      currentTime: [],
      show: false,
      showTime: ''
    };
  },
  methods: {
    tabClick(item) {
      this.day.forEach((i) => {
        i.active = false;
      });
      item.active = true;
      this.getTime();
    },
    timeClick(item) {
      this.time.forEach((i) => {
        i.active = false;
      });
      item.active = true;
    },
    getTime() {
      let day = '';
      let timeRang = '';
      this.day.forEach((i) => {
        if (i.active) {
          day = i.time;
        }
      });
      this.time.forEach((i) => {
        if (i.active) {
          timeRang = i.text;
        }
      });
      this.showTime = day + ' ' + timeRang;
      this.currentTime = [day + ' ' + timeRang.split('-')[0], day + ' ' + timeRang.split('-')[1]];
      this.$emit('update:value', this.currentTime);
    },
    check() {
      this.getTime();
      this.show = false;
    },
    del() {
      this.show = false;
      this.showTime = '';
      this.$emit('update:value', '');
    }
  },
};
</script>
<style lang="scss" scoped>
.time-page {
  width: 600px;
}
.time-input {
  width: 240px;
}
.time-show {
  position: absolute;
  z-index: 1;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border: 1px solid #e4e7ed;
  padding: 10px;
  border-radius: 10px;
  margin-top: 4px;
}
.item-warp {
  display: inline-flex;
  margin-bottom: 10px;
  text-align: center;
  .item {
    padding: 6px 6px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 3px;
    margin-right: 4px;
    cursor: pointer;
    background-color: rgb(234, 238, 240);
    &.active {
      color: #fff;
      background-color: #42b983;
      border-color: #42b983;
    }
    &.time {
      margin-right:20px;
    }
  }
}
.op-warp {
  padding-top: 20px;
  float: right;
}
</style>
