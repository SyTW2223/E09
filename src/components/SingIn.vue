<template>
<div class="auth">
  <div class="header">
    <router-link to="/">
      <div>
        <img height="90" src="../assets/juicer_icon.png" alt="Logo de Juicer">
      </div>
    </router-link>
  </div>
  <div class="body">
    <form class="form" autocomplete="off" @submit.prevent="signIn">
      <div class="body">
        <h3 class="title">Iniciar sesi&oacute;n</h3>
        <div>
          <div class="form-group">
            <input type="email" v-model=user.email class="form-control" placeholder="Correo electrónico">
            <input type="password"  v-model=user.password class="form-control" placeholder="Contraseña">
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
          password: ''
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