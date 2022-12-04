<template>
  <div id="singIn" class="container">
    <h1>
      Inicio de sesión
    </h1>
    <input type="text" v-model="data.name">
    <input type="password" v-model="data.password">
    <br>
    <button @click="signIn">Iniciar sesión</button>
    <p>
      {{ $store.state.user.must }}
    </p>
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
#sigIn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #db4804;
  margin-top: 60px;
}
</style>
