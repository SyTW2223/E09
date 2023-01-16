<template>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <JuiceComponent/>
    </div>
  </div>
</template>

<script>
  import JuiceComponent from './JuiceComponent.vue'
  export default {
    name: 'OpenJuice',
    methods: {
      closePage() {
        this.$store.dispatch('setJuicePage', false);
      }
    },
    components: {
      JuiceComponent
    }
  }
</script>
  
       
<style>
</style>