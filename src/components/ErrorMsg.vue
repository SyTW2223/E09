<template>
  <div class="alert alert-danger" role="alert">
    {{error}}  
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'ErrorMsg',
    computed: {
      ...mapGetters(['error'])
    }
  }
</script>