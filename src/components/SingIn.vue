<template>
<div class="auth">
  <div class="header">
    <router-link to="/">
      <div>
        <img height="185" src="../assets/logoblanco.png" alt="Logo de Juicer">
      </div>
    </router-link>
  </div>
  <div class="body">
    <form class="form" autocomplete="off" @submit.prevent="signIn">
      <div class="body">
        <h3 class="title">Iniciar sesi&oacute;n</h3>
        <div>
          <div class="form-group">
            <input type="email" v-model=user.email class="form-control" placeholder="Correo electrónico" required>
            <input type="password"  v-model=user.password class="form-control" placeholder="Contraseña" required>
            <input type="password" v-model=user.confirm_password class="form-control" placeholder="Confirmar contraseña" required>
          </div>
        </div>
      </div>
      <div class="actions">
        <button type="submit" class="btn btn-primary btn-lg btn-block">
          Acceder
        </button>
        <div class="mt-2">
          <p>
            ¿Eres nuevo?
            <router-link to="signup">
              Registrate
            </router-link>
          </p>
          <p>
            <router-link to="forgot">
              ¿Olvidaste tu contrase&ntilde;a?
            </router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
  </div>
</template>
 
<script>
  export default {
    name: 'SingIn',
    data() {
      return {
        user: {
          email: '',
          password: '',
          confirm_password: ''
        }
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', this.user);
        this.$store.dispatch('postSignIn');
      }
    }
  }
</script>
 
<style>

</style>