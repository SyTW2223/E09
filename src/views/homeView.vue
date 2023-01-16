<template>
  <div>
    <div class="page">
      <!--SignedIn/-->
      <h2 class="message"><b>Inicio</b></h2>
      <button class="refresh-btn orange-btn" href="#" @click="forceRerender">↺</button>
      <JuicesList  :key="componentKey"/>
    </div>
    <NewJuice v-if='newJuice'/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewJuice from "../components/NewJuice.vue";
import JuicesList from "../components/JuicesList.vue";
//import SignedIn from "../components/SignedIn.vue";
export default {
  name: 'HomeView',
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    //SignedIn,
    NewJuice,
    JuicesList
  },
  computed: {
    ...mapGetters(['newJuice'])
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  },
  created() {
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
    right: 7.5%; /* posición a la derecha de la pantalla */
  }
  .message {
    margin-top: 50px;
  }
</style>