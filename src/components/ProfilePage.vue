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
        <p>Seguidores</p>
      </div>
      <div class="stat">
        <p>{{ following.length }}</p>
        <p>Siguiendo</p>
      </div>
      <div class="stat">
        <p>{{ number_of_juices }}</p>
        <p>Juices</p>
      </div>
    </div>
    <div class="follow-btn" v-if="loggedUser"> {{ chekIfFollowed() }}
      <button class="bttn" v-if="loggedUser.name != name && !followed" @click="followUser">Follow</button>
      <button class="bttn" v-if="loggedUser.name != name && followed" @click="followUser">Followed</button>
    </div>
    <div class="follow-btn" v-else>
      <button class="bttn" @click="followUser">Follow</button>
    </div>
    <div class="tab" v-if="profileTab">
      <button class="tab-btn" @click="showUserJuices">Juices</button>
      <button class="disabled-tab-btn" @click="showLikedJuices">Me gusta</button>
    </div>
    <div class="tab" v-else>
      <button class="disabled-tab-btn" @click="showUserJuices">Juices</button>
      <button class="tab-btn" @click="showLikedJuices">Me gusta</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'ProfilePage',
    data() {
      return {
        followed: null,
        profileTab: true
      }
    },
    methods: {
      showUserJuices() {
        this.profileTab = true;
        this.$store.dispatch('setLikedPage', false);
        this.$store.dispatch('getJuicesByUserName', this.$route.params.userName);
      },
      showLikedJuices() {
        this.profileTab = false;
        this.$store.dispatch('setLikedPage', true);
        this.$store.dispatch('getJuicesLikedByUserName', this.$route.params.userName);
      },
      async followUser() {
        if (this.loggedUser) {
          let updatedFollowing = this.loggedUser.following;
          const position = updatedFollowing.indexOf(this.$route.params.userName);
          if (position > -1) {
            updatedFollowing.splice(position, 1);
            this.followed = false;
          } else {
            updatedFollowing.push(this.$route.params.userName);
            this.followed = true;
          }
          await this.$store.dispatch('followUser', updatedFollowing);
          this.$store.dispatch('getFollowers', this.$route.params.userName);
        } else {
          this.$router.push('/signin');
        }
      },
      chekIfFollowed() {
      const position = this.$store.getters.loggedUser.following.indexOf(this.$route.params.userName);
      if (position > -1) {
        this.followed = true;
      } else {
        this.followed = false;
      }
    }
    },
    computed: {
      ...mapGetters(['name', 'description', 'following', 'juices', 'likedPage', 'loggedUser', 'number_of_juices', 'followers'])
    },
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
  .tab {
    justify-content: space-between;
    margin-bottom: 1rem;
    text-align: center;
  }
  .tab:first-child {
    margin-right: 0.5rem;
  }
  .tab:last-child {
    margin-left: 0.5rem;
  }
  .tab-btn {
    padding: 0.5rem 1rem;
    background-color: #ED701B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .disabled-tab-btn {
    padding: 0.5rem 1rem;
    background-color: white;
    color: #ED701B;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>