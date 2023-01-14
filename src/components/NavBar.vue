<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div>
          <router-link class="navbar-brand" to="/">
            <img height="35" src="../assets/logo.png">
          </router-link>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul v-if="!user" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/signin">Iniciar sesión</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">Registrarse</router-link>
            </li>
          </ul>
          <ul v-if="user" class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="signOut()">Cerrar sesión</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="newJuice()">+</a>
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
        this.$store.dispatch('setUser', null);
        this.$router.push('/');
      },
      newJuice() {
        this.$store.dispatch('setNewJuice', true);
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>