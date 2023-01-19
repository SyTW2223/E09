<template>
  <div>
    <div class="header">
      <h1>@{{ name }}</h1>
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
        <p>{{ following.length }}</p>
        <p>Following</p>
      </div>
      <div class="stat">
        <p>{{ number_of_juices }}</p>
        <p>Juices</p>
      </div>
    </div>
    <div class="follow-btn" v-if="loggedUser">
      <button class="bttn" v-if="loggedUser.name != name" @click="followUser">Follow</button>
    </div>
    <div class="follow-btn" v-else>
      <button class="bttn" @click="followUser">Follow</button>
    </div>
    <div class="juice-bar">
      <button class="juice-bar-button" @click="showUserJuices">Juices</button>
      <button class="juice-bar-button" @click="showLikedJuices">Liked Juices</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'ProfilePage',
    methods: {
      showUserJuices() {
        this.$store.dispatch('setLikedPage', false);
        this.$store.dispatch('getJuicesByUserName', this.$route.params.userName);
      },
      showLikedJuices() {
        this.$store.dispatch('setLikedPage', true);
        this.$store.dispatch('getJuicesLikedByUserName', this.$route.params.userName);
      },
      followUser() {
        let updatedFollowing = this.loggedUser.following;
        updatedFollowing.push(this.$route.params.userName);
        if (this.loggedUser) {
          this.$store.dispatch('followUser', updatedFollowing);
          this.$store.dispatch('getFollowers', this.$route.params.userName);
        } else {
          this.$router.push('/signin');
        }
      }
    },
    computed: {
      ...mapGetters(['name', 'description', 'following', 'juices', 'likedPage', 'loggedUser', 'number_of_juices', 'followers'])
    },
    created() {
      this.$store.dispatch('getUser', this.$route.params.userName);
      this.$store.dispatch('getFollowers', this.$route.params.userName);
      this.$store.dispatch('getJuicesByUserName', this.$route.params.userName);
      this.$store.dispatch('getLoggedUser');
    }
  }
</script>
     
<style>
  .profile-page {
      width: 50%;
      margin: 5% auto;
      background-color: rgb(255, 255, 255);
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
  .juice-bar {
  justify-content: space-between;
  margin-bottom: 1rem;
  text-align: center;
  }
  .juice-bar-button {
  padding: 0.5rem 1rem;
  background-color: #e7910e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  .juice-bar-button:first-child {
    margin-right: 0.5rem;
  }

  .juice-bar-button:last-child {
    margin-left: 0.5rem;
  }
</style>