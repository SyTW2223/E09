<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div>
          <router-link class="navbar-brand" to="/">
            <img height="35" src="../assets/logo.png">
          </router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul v-if="!user" class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/signin">Iniciar sesión</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/signup">Registrarse</router-link>
            </li>
          </ul>
          <ul v-if="user" class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="signOut()">Cerrar sesión</a>
            </li>
          </ul>
          <button v-if="user && !newJuice" class="nueva-publicacion" href="#" @click="setNewJuice()">+</button>
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
      setNewJuice() {
        this.creating = true;
        this.$store.dispatch('setNewJuice', true);
      }
    },
    computed: {
      ...mapGetters(['user']),
      ...mapGetters(['newJuice']),
    }
  }
</script>

<style>
  .nueva-publicacion {
    background-color: #ED701B; /* color de fondo naranja */
    color: white; /* color de letra blanco */
    border-radius: 50%; /* para hacer el botón redondo */
    width: 50px; /* tamaño del botón */
    height: 50px; /* tamaño del botón */
    padding: 2.5px; /* para centrar el contenido del botón */
    font-size: 30px; /* tamaño de la letra */
    position: fixed; /* para hacer que el botón flote */
    top: 35px; /* posición en la parte inferior de la pantalla */
    right: 35px; /* posición a la derecha de la pantalla */
    border: none;
    z-index: 99;
  }
  .nueva-publicacion:hover {
    background-color: #FF8429;
  }
  .navbar-nav {
    margin-left: auto;
  }
</style>
