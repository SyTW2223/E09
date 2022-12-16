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
        <ErrorMsg v-if="error"/>
        <h3 class="title">Iniciar sesi&oacute;n</h3>
        <div>
          <div class="form-group">
            <input type="email" v-model=user.email class="form-control" placeholder="Correo electrónico" required>
            <input type="password" v-model=user.password class="form-control" placeholder="Contraseña" required>
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
  import 'custom-element-password-toggle'
  import { mapGetters } from 'vuex';
  import ErrorMsg from './ErrorMsg.vue'
  export default {
    name: 'SingIn',
    components: {
      ErrorMsg
    },
    data() {
      return {
        user: {
          email: '',
          password: '',
          confirm_password: ''
        }
      }
    },
    created() {
      this.$store.dispatch('setError', null);
    },
    methods: {
      signIn() {
        if (this.user.confirm_password === this.user.password) {
          this.$store.dispatch('signIn', this.user);
          this.$store.dispatch('postSignIn');
        } else {
          this.$store.dispatch('setError', 'Contraseñas distintas');
        }
      }
    },
    computed: {
      ...mapGetters(['error'])
    }
  }
</script>
 
<style>

</style>