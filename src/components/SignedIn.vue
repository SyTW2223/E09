<template>
    <div class="container message">
        <h3 v-if="loggedUser">Bienvenido a Juicer {{ loggedUser.name }}!!</h3>
        <h3 v-if="!loggedUser">No has iniciado sesión.</h3>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'SignedIn',
    created() {
      this.$store.dispatch('getLoggedUser');
    },
    computed: {
      ...mapGetters(['loggedUser'])
    }
  }
</script>

<style>
  .message {
    margin-top: 50px;
  }
</style>