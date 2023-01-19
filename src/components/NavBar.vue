<template>
  <div>
    <nav class="navbar nav-bar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div>
          <router-link class="navbar-brand" @click="closePages" to="/">
            <img height="35" src="../assets/logo.png">
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul v-if="!loggedUser" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link"  @click="closePages" to="/signin">Iniciar sesión</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link"  @click="closePages" to="/signup">Registrarse</router-link>
            </li>
          </ul>
          <ul v-if="loggedUser" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" @click="signOut(); closePages()" to="/" >Cerrar sesión</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" @click="closePages(); loadProfileData()" :to="'/profile/' + loggedUser.name">Mi perfil</router-link>
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
      },
      setNewJuice() {
        this.$store.dispatch('setNewJuice', true);
      },
      closePages() {
        this.$store.dispatch('setNewJuice', false);
        this.$store.dispatch('setJuicePage', false);
        this.$store.dispatch('setDeleteMsg', false);
      },
      loadProfileData() {
        this.$store.dispatch('getUser', this.loggedUser.name);
        this.$store.dispatch('getFollowers', this.loggedUser.name);
        this.$store.dispatch('getJuicesByUserName', this.loggedUser.name);
        this.$store.dispatch('getLoggedUser');
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
    z-index: 6;
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
