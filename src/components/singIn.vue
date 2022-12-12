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
    <form class="form" autocomplete="off">
      <div class="body">
        <h3 class="title">Iniciar sesi&oacute;n</h3>
        <div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Correo electrónico">
            <input type="password" class="form-control" placeholder="Contraseña">
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-primary btn-lg btn-block">
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
            <router-link to="">
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
    data() {
      return {
        data: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', this.data);
      }
    }
  }
</script>
 
<style>

</style>