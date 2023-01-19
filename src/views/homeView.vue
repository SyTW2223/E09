<template>
  <div class="page">
    <button class="refresh-btn orange-btn" href="#" @click="forceRerender">↺</button>
    <div class="home-tab">
      <div class="tab" v-if="homeTab && loggedUser">
        <button class="tab-btn" @click="showAllJuices">Inicio</button>
        <button class="disabled-tab-btn" @click="showFollowingJuices">Siguiendo</button>
      </div>
      <div class="tab" v-if="!homeTab && loggedUser">
        <button class="disabled-tab-btn" @click="showAllJuices">Inicio</button>
        <button class="tab-btn" @click="showFollowingJuices">Siguiendo</button>
      </div>
      <div v-if="!loggedUser">
        <button class="tab-btn" disabled>Inicio</button>
      </div>
    </div>
    <JuicesList  :key="componentKey"/>
  </div>
  <NewJuice v-if="newJuice"/>
  <JuiceComponent v-if="juicePage"/>
  <DeleteMsg v-if="deleteMsg"/>
</template>

<script>
import { mapGetters } from 'vuex';
import NewJuice from "../components/NewJuice.vue";
import JuicesList from "../components/JuicesList.vue";
import JuiceComponent from "../components/JuiceComponent.vue";
import DeleteMsg from '@/components/DeleteMsg.vue';
export default {
  name: 'HomeView',
  data() {
    return {
      componentKey: 0,
      homeTab: true
    };
  },
  components: {
    NewJuice,
    JuicesList,
    JuiceComponent,
    DeleteMsg
  },
  computed: {
    ...mapGetters(['newJuice', 'juicePage', 'deleteMsg', 'loggedUser'])
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    showAllJuices() {
      this.homeTab = true;
      this.$store.dispatch('getJuices');
    },
    showFollowingJuices() {
      this.homeTab = false;
      this.$store.dispatch('getFollowingJuices');
    },
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
  .home-tab {
    margin-top: 50px;
    margin-bottom: 20px;
  }
</style>