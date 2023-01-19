<template>
  <div class="page">
    <button class="refresh-btn orange-btn" href="#" @click="forceRerender">↺</button>
    <div class="profile-page">
    <ProfilePage/>
    <JuicesList :key="componentKey"/>
    </div>
  </div>
  <NewJuice v-if="newJuice"/>
  <JuiceComponent v-if="juicePage"/>
  <DeleteMsg v-if="deleteMsg"/>
</template>
  
<script>
  import { mapGetters } from 'vuex';
  import NewJuice from "../components/NewJuice.vue";
  import ProfilePage from "../components/ProfilePage.vue";
  import JuicesList from "../components/JuicesList.vue";
  import JuiceComponent from "../components/JuiceComponent.vue";
  import DeleteMsg from "../components/DeleteMsg.vue";
  export default {
    name: 'ProfileView',
    data() {
      return {
        componentKey: 0,
      };
    },
    components: {
      ProfilePage,
      JuicesList,
      JuiceComponent,
      DeleteMsg,
      NewJuice
    },
    methods: {
      forceRerender() {
        this.componentKey += 1;
      }
    },
    computed: {
      ...mapGetters(['newJuice', 'juicePage', 'deleteMsg'])
    },
    created() {
      this.$store.dispatch('getUser', this.$route.params.userName);
      this.$store.dispatch('getFollowers', this.$route.params.userName);
      this.$store.dispatch('getJuicesByUserName', this.$route.params.userName);
      this.$store.dispatch('getLoggedUser');
    }
  }
</script>