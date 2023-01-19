<template>
  <div class="page">
    <button class="refresh-btn orange-btn" href="#" @click="forceRerender">↺</button>
    <HomeTabs/>
    <JuicesList :key="componentKey"/>
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
import HomeTabs from '@/components/HomeTabs.vue';
export default {
  name: 'HomeView',
  data() {
    return {
      componentKey: 0,
      homeTab: true
    };
  },
  components: {
    HomeTabs,
    NewJuice,
    JuicesList,
    JuiceComponent,
    DeleteMsg
  },
  computed: {
    ...mapGetters(['newJuice', 'juicePage', 'deleteMsg'])
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
</style>