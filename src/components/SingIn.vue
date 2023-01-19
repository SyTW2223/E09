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
            <input id="password" type="password" v-model=user.password class="form-control" placeholder="Contraseña" required>
            <div class="checkboxes">
              <label><input type="checkbox" @click="changePasswordVisibility()"><span>&nbsp;Mostrar contraseña</span></label>        
            </div>
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
          password: ''
        }
      }
    },
    created() {
      this.$store.dispatch('setError', null);
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', this.user);
        this.$store.dispatch('postSignIn');
      },
      changePasswordVisibility() {
        if (document.getElementById('password').type === 'password') {
          document.getElementById('password').type = 'text';
          document.getElementById('confirm_password').type = 'text';
        } else {
          document.getElementById('password').type = 'password';
          document.getElementById('confirm_password').type = 'password';
        }
      }
    },
    computed: {
      ...mapGetters(['error'])
    }
  }
</script>
 
<style>
.checkboxes label {
  display: inline-block;
  padding-right: 10px;
  white-space: nowrap;
}
.checkboxes input {
  vertical-align: middle;
}
.checkboxes label span {
  vertical-align: middle;
}
</style>