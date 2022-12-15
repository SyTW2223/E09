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
    <form class="form" autocomplete="off" @submit.prevent="sendResetPasswordEmail()">
      <div class="body">
        <ErrorMsg v-if="error"/>
        <h3 class="title">Restablecer contraseña</h3>
        <p>
          Introduce tu nueva contrase&ntilde;a.
        </p>
        <div>
          <div class="form-group">
            <input type="password" v-model=email class="form-control" placeholder="Contraseña" required>
            <input type="password" v-model=email class="form-control" placeholder="Confirmar contraseña" required>
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
        password: ''
      }
    },
    created() {
      this.$store.dispatch('setError', null);
    },
    methods: {
      resetPassword() {
        this.$store.dispatch('setPassword', this.password);
        this.$store.dispatch('resetPassword', this.$route.params.token);
      }
    },
    computed: {
      ...mapGetters(['errorMsg'])
    }
  }
</script>