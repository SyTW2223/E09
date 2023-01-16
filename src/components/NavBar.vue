<template>
  <div>
    <nav class="navbar nav-bar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div>
          <router-link class="navbar-brand" to="/">
            <img height="35" src="../assets/logo.png">
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul v-if="!loggedUser" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/signin">Iniciar sesión</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/signup">Registrarse</router-link>
            </li>
          </ul>
          <ul v-if="loggedUser" class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="signOut()">Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <button v-if="loggedUser" class="orange-btn" href="#" @click="setNewJuice">+</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'NavBar',
    methods: {
      signOut() {
        localStorage.removeItem('token');
        this.$store.dispatch('setLoggedUser', null);
        this.$router.push('/');
      },
      setNewJuice() {
        this.$store.dispatch('setNewJuice', true);
      }
    },
    computed: {
      ...mapGetters(['loggedUser', 'newJuice'])
    }
  }
</script>

<style>
  .nav-bar {
    position: fixed;
    margin-top: -25px;
    width: 100%;
    z-index: 3;
  }
  .orange-btn {
    background-color: #ED701B;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: 2.5px;
    font-size: 30px;
    position: fixed;
    top: 12.5%;
    right: 12.5%;
    border: none;
    z-index: 1;
  }
  .orange-btn:hover {
    background-color: #FF8429;
  }
  .navbar-nav {
    margin-left: auto;
  }
</style>
