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
        <SuccessMsg v-if="success"/>
        <h3 class="title">¿Has olvidado tu contrase&ntilde;a?</h3>
        <p>
          Introduce tu correo electr&oacute;nico para restablecer tu contrase&ntilde;a.
        </p>
        <div>
          <div class="form-group">
            <input type="email" v-model=email class="form-control" placeholder="Correo electrónico" required>
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
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
  import ErrorMsg from './ErrorMsg.vue'
  import SuccessMsg from './SuccessMsg.vue'
  import { mapGetters } from 'vuex';
  export default {
    name: 'ForgotPassword',
    components: {
      ErrorMsg,
      SuccessMsg
    },
    data() {
      return {
        email: ''
      }
    },
    created() {
      this.$store.dispatch('setError', null);
    },
    methods: {
      sendResetPasswordEmail() {
        this.$store.dispatch('setEmail', this.email);
        this.$store.dispatch('sendResetPasswordEmail');
      }
    },
    computed: {
      ...mapGetters(['error', 'success'])
    }
  }
</script>