<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul v-if="!user" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/signin">Sign In</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
          </ul>
          <ul v-if="user" class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="signOut()">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'NavBar',
    methods: {
      signOut() {
        localStorage.removeItem('token');
        this.$store.dispatch('getUser', null);
        this.$router.push('/');
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>