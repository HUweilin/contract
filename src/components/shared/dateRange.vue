<template>
  <div class="range-wrapper">
    <el-button size="mini" :type="dateRangeType === null ? 'primary' : ''" @click="changeDateRange(null)">不限</el-button>
    <el-button size="mini" :type="dateRangeType === 'today' ? 'primary' : ''" @click="changeDateRange('today')">今天</el-button>
    <el-button size="mini" :type="dateRangeType === 'yesterday' ? 'primary' : ''" @click="changeDateRange('yesterday')">昨天</el-button>
    <el-button size="mini" :type="dateRangeType === 'before-yesterday' ? 'primary' : ''" @click="changeDateRange('before-yesterday')">前天</el-button>

    <el-button size="mini"
      v-if="isShowOtherRange"
      :type="dateRangeType === 'in-week' ? 'primary' : ''"
      @click="changeDateRange('in-week')">前7天</el-button>
    <el-button size="mini"
      v-if="isShowOtherRange"
      :type="dateRangeType === 'current-month' ? 'primary' : ''"
      @click="changeDateRange('current-month')">本月</el-button>
    <el-button size="mini"
      v-if="isShowOtherRange"
      :type="dateRangeType === 'last-month' ? 'primary' : ''"
      @click="changeDateRange('last-month')">上一个月</el-button>

    <el-button size="mini" :type="dateRangeType === 'custom' ? 'primary' : ''" @click="changeDateRange('custom')">自定义</el-button>
    <div class="picker-wrapper" v-if="dateRangeType === 'custom'">
      <el-date-picker
        size="mini"
        :unlink-panels="true"
        v-model="customRange"
        type="daterange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        @change="customDateRangeSelected($event)">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date-range',
  props: {
    isShowOtherRange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dateRange: {
        startOfDateRange: null,
        endOfDateRange: null
      },
      customRange: null,
      dateRangeType: null,
      dateRangeSelected: null
    }
  },
  methods: {
    changeDateRange (instructor) {
      switch (instructor) {
        case 'today':
          this.dateRange.startOfDateRange = this.getBeggingOfDay(0)
          this.dateRange.endOfDateRange = this.getBeggingOfDay(0, false)
          break
        case 'yesterday':
          this.dateRange.startOfDateRange = this.getBeggingOfDay(-1)
          this.dateRange.endOfDateRange = this.getBeggingOfDay(-1, false)
          break
        case 'before-yesterday':
          this.dateRange.startOfDateRange = this.getBeggingOfDay(-2)
          this.dateRange.endOfDateRange = this.getBeggingOfDay(-2, false)
          break
        case 'in-week':
          this.dateRange.startOfDateRange = this.getBeggingOfDay(-7)
          this.dateRange.endOfDateRange = null
          break
        case 'current-month':
          this.dateRange.startOfDateRange = this.getBeggingOfMonth()
          this.dateRange.endOfDateRange = this.getEndOfMonth()
          break
        case 'last-month':
          this.dateRange.startOfDateRange = this.getBeggingOfMonth(-1)
          this.dateRange.endOfDateRange = this.getEndOfMonth(-1)
          break
        case 'custom':
          this.clearDateRange()
          break
        default:
          this.clearDateRange()
          break
      }
      this.dateRangeType = instructor
      if (instructor !== 'custom') {
        this.dispatchDateRangeChangedEmiter()
      }
    },
    // 按天
    getBeggingOfDay (dayOffset = 0, isStart = true) {
      let now = new Date()
      let begging

      if (isStart) {
        begging = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      } else {
        begging = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
      }

      begging.setDate(begging.getDate() + dayOffset)
      return begging
    },
    // 按月
    getBeggingOfMonth (monthOffset = 0) {
      let begginMonth = new Date()
      let currentMonth = begginMonth.getMonth()
      begginMonth.setDate(1)
      begginMonth.setHours(0, 0, 0)
      begginMonth.setMonth(currentMonth + monthOffset)
      return begginMonth
    },
    getEndOfMonth (monthOffset = 0) {
      let endMonth = new Date()
      endMonth.setMonth(endMonth.getMonth() + monthOffset + 1)
      endMonth.setDate(0)
      endMonth.setHours(23, 59, 59)
      return endMonth
    },
    clearDateRange () {
      this.dateRange.startOfDateRange = null
      this.dateRange.endOfDateRange = null
    },
    customDateRangeSelected (date) {
      if (!date) {
        this.clearDateRange()
      } else {
        this.dateRange.startOfDateRange = date[0]
        this.dateRange.endOfDateRange = date[1]
      }
      this.dispatchDateRangeChangedEmiter()
    },
    dispatchDateRangeChangedEmiter () {
      this.$emit('dateRangeSelected', this.dateRange)
    }
  }
}
</script>

<style scoped>
  .range-wrapper {
    text-align: left;
  }
  .el-button {
    margin: 0 3px !important;
  }
  .picker-wrapper {
    display: inline-block;
  }
  .picker-wrapper {
    width: 340px;
  }
  .picker-wrapper >>> .el-date-editor {
    width: 100%;
  }
</style>
