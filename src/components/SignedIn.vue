<template>
    <div class="container">
        <h3 v-if="user">Bienvenido {{user.element.name}}!!</h3>
        <h3 v-if="!user">No has iniciado sesión.</h3>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'SignedIn',
    created() {
      this.$store.dispatch('getUser');
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>