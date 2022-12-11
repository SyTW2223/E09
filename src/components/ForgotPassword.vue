<template>
  <div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <router-link to="/"><img src="../assets/juicer-logo.png" id="icon" alt="User Icon" /></router-link>
    </div>

    <!-- Login Form -->
    <form>
      <input type="text" v-model=email id="login" class="fadeIn second" name="email" placeholder="Correo electrónico">
      <input type="submit" class="fadeIn fourth" value="Iniciar sesión">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <router-link class="underlineHover" to="/forgot">Olvidaste la contraseña?</router-link>
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
    }
  }
</script>