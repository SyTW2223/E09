<template>
    <div class="container">
        <h3 v-if="user">Bienvenido {{user.element.name}}!</h3>
        <h3 v-if="!user">No has iniciado sesión</h3>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'SignedIn',
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>