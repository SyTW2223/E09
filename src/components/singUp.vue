<template>
    <div id="sing-up" class="container">
      <form @submit="signUp">
        <input type="text" v-model="user.name">
        <input type="password" v-model="user.password">
        <input type="email" v-model="user.email">
        <input type="submit" value="Registrarse">
      </form>
    </div>
      <h1>{{ $store.state }}</h1>
</template>
  
<script>
  export default {
      data() {
        return {
          user: {
            name: '',
            email: '',
            password: ''
          }
        }
      },  
      mounted() {
        //this.$store.dispatch("postUsers");
      },
      methods: {
        signUp() {
          this.$store.dispatch('signUp', this.user);
          this.$store.dispatch('postUsers');
        },
      },
      computed: {
      },
  }
</script>

<style>

</style>