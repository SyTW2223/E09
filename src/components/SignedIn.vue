<template>
    <div class="container">
        <h3 v-if="user">Bienvenido {{user.element.name}}!</h3>
        <h3 v-if="!user">No has iniciado sesión</h3>
    </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    name: 'SignedIn',
    async created() {
      try {
        const response = await axios.get('user');
        this.$store.dispatch('getUser', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>