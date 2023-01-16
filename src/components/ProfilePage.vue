<template>
  <div>
    <h1>
      Profile Page !!
    </h1>
  </div>
  <div class="profile-page">
    <div class="header">
      <h1>{{ name }}</h1>
    </div>
    <div class="bio">
       <p>{{ description }}</p>
    </div>
    <div class="stats">
      <div class="stat">
        <p>{{ followers }}</p>
        <p>Followers</p>
      </div>
      <div class="stat">
        <p>{{ following }}</p>
        <p>Following</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'ProfilePage',
    methods: {
    },
    computed: {
      ...mapGetters(['name', 'description', 'followers', 'following'])
    },
    created() {
      this.$store.dispatch('getUser', this.$route.params.userName);
    }
  }
</script>
     
<style>
  .profile-page {
      width: 600px;
      margin: 50px auto;
      background-color: #fff;
      box-shadow: 0px 0px 10px #ddd;
      padding: 20px;
      border-radius: 10px;
  }
  .stats {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  }
  .stat {
      text-align: center;
      width: 33%;
  }
  .header {
    position: relative;
    overflow: hidden;
  }
  .cover-photo {
    width: 100%;
    height: 100px;
  }
  .profile-photo {
    position: relative;
    width: 50px;
    height: 50px;
  }
</style>