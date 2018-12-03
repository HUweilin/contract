<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    try {
      document.body.removeChild(document.getElementById('app-loader'))
    } catch (e) {
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
