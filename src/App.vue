<template>
  <div>
    <NavBar/>
    <div class="page-content">
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
  .page-content {
    margin-top: 25px;
    color:black;
  }
  @media (max-width: 767px) {
    .page-content {
      color: black;
    }
  }
</style>