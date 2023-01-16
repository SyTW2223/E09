<template>
    <div class="page">
      <JuiceComponent/>
    </div>
    <NewJuice v-if='newJuice'/>
  </template>
  
  <script>
    import { mapGetters } from 'vuex';
    import JuiceComponent from "../components/JuiceComponent.vue";
    export default {
      name: 'JuiceView',
      components: {
        JuiceComponent
      },
      computed: {
        ...mapGetters(['newJuice'])
      }
    }
  </script>