export default {
  props: {
    isSearching: {
      type: Boolean,
      default: false
    },
    autoSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 筛选过多时收起部分
      moreFilterExpanded: false
    }
  },
  methods: {
    // 点击查询
    onSubmitCondition () {
      this.$emit('conditionSelected', this.condition)
    },
    // 自动查询
    dispatchConditionChangedEvent () {
      if (!this.autoSearch) {
        this.moreFilterExpanded = true
      }
      this.$emit('conditionChanged', this.condition)
    },
    toggleMoreFilters () {
      this.moreFilterExpanded = !this.moreFilterExpanded
    }
  }
}
