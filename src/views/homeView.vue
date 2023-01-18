<template>
  <div class="page">
    <h2 class="message"><b>Inicio</b></h2>
    <button class="refresh-btn orange-btn" href="#" @click="forceRerender">↺</button>
    <JuicesList  :key="componentKey"/>
  </div>
  <NewJuice v-if='newJuice'/>
  <JuiceComponent v-if='juicePage'/>
</template>

<script>
import { mapGetters } from 'vuex';
import NewJuice from "../components/NewJuice.vue";
import JuicesList from "../components/JuicesList.vue";
import JuiceComponent from "../components/JuiceComponent.vue";
export default {
  name: 'HomeView',
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    NewJuice,
    JuicesList,
    JuiceComponent
  },
  computed: {
    ...mapGetters(['newJuice', 'juicePage'])
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  },
  created() {
    this.$store.dispatch('getLoggedUser');
    this.$store.dispatch('getJuices');
  }
}
</script>

<style>
 .page {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .refresh-btn {
    right: 7.5%;
  }
  .message {
    margin-top: 50px;
  }
</style>