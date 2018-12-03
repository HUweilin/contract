<template>
  <el-pagination v-if="pagination.total && pagination.pageCount > 1"
    background
    :page-size="pagination.pageSize"
    :total="pagination.total"
    layout="prev, pager, next"
    :current-change="pagination.currentPage"
    @current-change="pageSelected"></el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      default () {
        return {
          currentPage: 1,
          items: []
        }
      }
    }
  },
  data () {
    return {
      pageSize: 10
    }
  },
  methods: {
    pageSelected (page) {
      this.pagination.currentPage = page
      this.$emit('update:pagination', this.pagination)
      this.$emit('current-page', page)
    }
  }
}
</script>

<style scoped>

</style>
