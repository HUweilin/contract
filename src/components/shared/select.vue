<template>
  <div class="region-select">
    <el-select :name="name" v-if="returnBy === 'object'" size="mini" :value="value" value-key="id" filterable :clearable="clearable" @change="onChange">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item"></el-option>
    </el-select>
    <el-select :name="name" v-if="returnBy === 'id'" size="mini" :value="value" filterable :clearable="clearable" @change="onChange">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select :name="name" v-if="returnBy === 'name'" size="mini" :value="value" filterable :clearable="clearable" @change="onChange">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: [Object, String, Number],
    options: {
      type: Array,
      default () {
        return []
      }
    },
    returnBy: {
      type: String,
      default: 'object'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    name: String
  },
  methods: {
    onChange (item) {
      this.$emit('change', item)
      this.$emit('input', item)
    }
  }
}
</script>

<style scoped>

</style>
