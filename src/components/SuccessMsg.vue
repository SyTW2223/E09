<template>
  <div class="alert alert-success" role="alert">
    {{success}}  
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'SuccessMsg',
    computed: {
      ...mapGetters(['success'])
    }
  }
</script>