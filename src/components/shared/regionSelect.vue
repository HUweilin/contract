<template>
  <div class="select-group">
    <template v-if="!isReadOnly">
      <Select v-if="regions"
        v-model="selectedRegionLev1"
        :options="regions"
        :clearable="false"
        @change="onSelectedLevel($event); selectedRegionLev2 = null; selectedRegionLev3 = null;"></Select>
      <Select v-if="selectedRegionLev1 && selectedRegionLev1.children && selectedRegionLev1.children.length"
        v-model="selectedRegionLev2"
        :options="selectedRegionLev1.children"
        :clearable="false"
        @change="onSelectedLevel($event); selectedRegionLev3 = null;"></Select>
        <Select v-if="selectedRegionLev2 && selectedRegionLev2.children && selectedRegionLev2.children.length"
        v-model="selectedRegionLev3"
        :options="selectedRegionLev2.children"
        :clearable="false"
        @change="onSelectedLevel"></Select>
    </template>
    <template v-else>
      <span class="region-name" v-if="selectedRegionLev1">{{selectedRegionLev1.name}}</span>
      <span class="region-name" v-if="selectedRegionLev2">-{{selectedRegionLev2.name}}</span>
      <span class="region-name" v-if="selectedRegionLev3">-{{selectedRegionLev3.name}}</span>
    </template>
  </div>
</template>

<script>
import regionService from '../../services/regionService.js'
export default {
  name: 'regin-select',
  props: {
    value: [String, Number],
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      regions: null,
      selectedRegionLev1: null,
      selectedRegionLev2: null,
      selectedRegionLev3: null
    }
  },
  created () {
    this.getRegions()
  },
  methods: {
    getRegions () {
      regionService.getRegions().then(regions => {
        this.regions = regions
        this.processRegion()
      })
    },
    onSelectedLevel (region) {
      this.$emit('change', region.id)
      this.$emit('input', region.id)
    },
    // 初始value显示
    processRegion () {
      if (!this.regions || !this.value) {
        return
      }
      let regionId = +this.value
      this.searchLevel1(regionId)
    },
    searchLevel1 (regionId) {
      for (let lv1 of this.regions) {
        if (lv1.id === regionId) {
          this.selectedRegionLev1 = lv1
          break
        }
        let selectedLv1 = this.searchLevel2(regionId, lv1)
        if (selectedLv1) {
          this.selectedRegionLev1 = selectedLv1
          break
        }
      }
    },
    searchLevel2 (regionId, lv1) {
      let selectedLv1
      let selectedLv2
      for (let lv2 of lv1.children) {
        if (lv2.id === regionId) {
          this.selectedRegionLev2 = lv2
          selectedLv1 = lv1
          break
        }
        selectedLv2 = this.searchLevel3(regionId, lv2)
        if (selectedLv2) {
          this.selectedRegionLev2 = selectedLv2
          selectedLv1 = lv1
          break
        }
      }
      return selectedLv1
    },
    searchLevel3 (regionId, lv2) {
      let selectedLv
      for (let lv3 of lv2.children) {
        if (lv3.id === regionId) {
          this.selectedRegionLev3 = lv3
          selectedLv = lv2
          break
        }
      }
      return selectedLv
    }
  },
  watch: {
    'value': {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.processRegion()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
  .select-group {
    display: inline-block;
  }
  .region-select {
    display: inline-block;
    margin: 2px;
  }
</style>
