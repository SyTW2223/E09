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
    <form class="form" autocomplete="off" @submit.prevent="resetPassword()">
      <div class="body">
        <ErrorMsg v-if="error"/>
        <h3 class="title">Restablecer contraseña</h3>
        <p>
          Introduce tu nueva contrase&ntilde;a.
        </p>
        <div>
          <div class="form-group">
            <input id="password" type="password" v-model=user.password class="form-control" placeholder="Contraseña" required>
            <input id="confirm_password" type="password" v-model=user.confirm_password class="form-control" placeholder="Confirmar contraseña" required>
            <div class="checkboxes">
              <label><input type="checkbox" @click="changePasswordVisibility()"><span>&nbsp;Mostrar contraseñas</span></label>        
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <button type="submit" class="btn btn-primary btn-lg btn-block">
          Enviar
        </button>
        <div class="mt-2">
          <p>
            &oacute;
            <br>
            <router-link to="signin">
              Inicia sesi&oacute;n
            </router-link>
          </p>
          <p>
            <router-link to="signin">
              Regístrate
            </router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</div>
</template>
  
<script>
  import ErrorMsg from './ErrorMsg.vue'
  import { mapGetters } from 'vuex';
  export default {
    name: 'ResetPassword',
    components: {
      ErrorMsg
    },
    data() {
      return {
        user: {
          password: '',
          confirm_password: ''
        }
      }
    },
    created() {
      this.$store.dispatch('setError', null);
    },
    methods: {
      resetPassword() {
        if (this.user.confirm_password === this.user.password) {
          this.$store.dispatch('setPassword', this.user.password);
          this.$store.dispatch('resetPassword', this.$route.params.token);
        } else {
          this.$store.dispatch('setError', 'Contraseñas distintas');
        }
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