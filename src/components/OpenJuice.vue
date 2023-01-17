<template>
  <div>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <JuiceComponent/>
    </div>
  </div>
  <DeleteMsg v-if="deleteMsg"/>
  </div>
</template>

<script>
  import JuiceComponent from './JuiceComponent.vue'
  import DeleteMsg from './DeleteMsg.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'OpenJuice',
    methods: {
      closePage() {
        this.$store.dispatch('setJuicePage', false);
      }
    },
    components: {
      JuiceComponent,
      DeleteMsg
    },
    computed: {
      ...mapGetters(['deleteMsg']),
    }
  }
</script>
  
       
<style>
</style>