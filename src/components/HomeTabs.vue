<template>
  <div class="home-tab">
    <div class="tab" v-if="homeTab && loggedUser">
      <button class="tab-btn" @click="showAllJuices"><h4>Inicio</h4></button>
      <button class="disabled-tab-btn" @click="showFollowingJuices"><h4>Siguiendo</h4></button>
    </div>
    <div class="tab" v-if="!homeTab && loggedUser">
      <button class="disabled-tab-btn" @click="showAllJuices"><h4>Inicio</h4></button>
      <button class="tab-btn" @click="showFollowingJuices"><h4>Siguiendo</h4></button>
    </div>
      <div v-if="!loggedUser">
      <button class="tab-btn" disabled><h4 style="font-weight: bold">Inicio</h4></button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HomeTabs',
  data() {
    return {
      homeTab: true
    };
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  methods: {
    showAllJuices() {
      this.homeTab = true;
      this.$store.dispatch('getJuices');
    },
    showFollowingJuices() {
      this.homeTab = false;
      this.$store.dispatch('getFollowingJuices');
    },
  }
}
</script>

<style>
  .home-tab {
    margin-top: 50px;
    margin-bottom: 20px;
  }
</style>