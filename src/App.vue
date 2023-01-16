<template>
  <div>
    <NavBar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
  .content {
    margin-top: 25px;
  }
</style>