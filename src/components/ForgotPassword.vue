<template>
  <div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <router-link to="/"><img src="../assets/juicer-logo.png" id="icon" alt="User Icon" /></router-link>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="sendResetPasswordEmail()">
      <input type="text" v-model=email id="login" class="fadeIn second" name="email" placeholder="Correo electrónico">
      <input type="submit" class="fadeIn fourth" value="Enviar">
    </form>

    <!-- Remind Passowrd -->
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
    name: 'ForgotPassword',
    data() {
      return {
        email: ''
      }
    },
    methods: {
      sendResetPasswordEmail() {
        this.$store.dispatch('sendResetPasswordEmail', this.email);
      }
    }
  }
</script>