<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">

      <div class="fadeIn first">
        <router-link to="/"><img src="../assets/juicer-logo.png" id="icon" alt="User Icon" /></router-link>
      </div>
  
      <form @submit.prevent="resetPassword()">
        <input type="password" v-model=password id="reset-password" class="fadeIn second" name="password" placeholder="Nueva contraseña">
        <input type="submit" class="fadeIn fourth" value="Enviar">
      </form>
  
      <div id="formFooter">
        <router-link class="underlineHover" to="/signin">Iniciar sesión</router-link>
        <br>
        <router-link class="underlineHover" to="/signup">Registrarse</router-link>
      </div>
  
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'ResetPassword',
    data() {
      return {
        password: ''
      }
    },
    methods: {
      resetPassword() {
        this.$store.dispatch('setPassword', this.password);
        this.$store.dispatch('resetPassword', this.$route.params.token);
      }
    }
  }
</script>