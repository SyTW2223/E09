<template>
  <div class="page">
    <ProfilePage/>
  </div>
  <NewJuice v-if='newJuice'/>
</template>
  
<script>
  import { mapGetters } from 'vuex';
  import ProfilePage from "../components/ProfilePage.vue";
  export default {
    name: 'ProfilePageView',
    components: {
      ProfilePage
    },
    computed: {
      ...mapGetters(['newJuice'])
    }
  }
</script>