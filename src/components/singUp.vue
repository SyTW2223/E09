<template>
  <div class="auth">
    <div class="header">
      <router-link to="/">
        <div>
          <img height="100" src="../assets/juicer_icon.png" alt="Logo de Juicer">
        </div>
      </router-link>
    </div>
    <div class="body">
      <form class="form" autocomplete="off">
        <div class="body">
          <h3 class="title">¡Bienvenido a Juicer!</h3>
          <div>
            <div class="form-group">
              <input v-model=user.name type="text" class="form-control" placeholder="Nombre de usuario">
              <input v-model=user.email type="email" class="form-control" placeholder="Correo electrónico">
              <input v-model=user.password type="password" class="form-control" placeholder="Contraseña">
            </div>
          </div>
        </div>
        <div class="actions">
          <button @click="signUp()" class="btn btn-primary btn-lg btn-block">
            Registrarse
          </button>
          <div class="mt-2">
            <p>
              ¿Ya tienes cuenta?
              <router-link to="signin">
                Iniciar sesi&oacute;n
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
          user: {
            name: '',
            email: '',
            password: ''
          }
        }
      },  
      mounted() {
        //this.$store.dispatch("postUsers");
      },
      methods: {
        signUp() {
          this.$store.dispatch('signUp', this.user);
          this.$store.dispatch('postUsers');
        },
      },
      computed: {
      },
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
body {
  font-family: "Roboto", sans-serif;
}

.auth .header {
  padding: 13vh 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  background-image: linear-gradient(to right,#f12711, #f5af19);
  background-size: cover;
  background-position: center center;
  position: relative;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}

.auth .logo {
  position: relative;
  z-index: 18;
  background: #fff;
  padding: 5px;
  border-radius: 80%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.auth .body {
  padding-bottom: 2rem;
}
.auth .form {
  min-width: 280px;
  max-width: 340px;
  margin: auto;
  margin-top: -70px;
  padding: 0 10px;
  position: relative;
  z-index: 9;
}
.auth .form .body {
  padding: 0.7rem 1.5rem 35px;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.auth .form .title {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #e48532
}
.auth .form .actions {
  text-align: center;
  padding: 0 2rem;
  margin-top: -25px;
}
.auth .form .actions .btn {
  border-radius: 30px;
  box-shadow: 0 2px 12px rgba(50, 128, 228, 0.5);
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=email] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=email]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=password] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=password]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
</style>