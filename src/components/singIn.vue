<template>
<div class="auth">
  <div class="auth__header">
    <router-link to="/">
      <div class="auth__logo">
        <img height="90" src="https://cdn-icons-png.flaticon.com/512/135/135620.png" alt="">
      </div>
    </router-link>
  </div>
  <div class="auth__body">
    <form class="auth__form" autocomplete="off">
      <div class="auth__form_body">
        <h3 class="auth__form_title">Juicer</h3>
        <div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Correo electrónico">
            <input type="password" class="form-control" placeholder="Contraseña">
          </div>
        </div>
      </div>
      <div class="auth__form_actions">
        <button class="btn btn-primary btn-lg btn-block">
          Inicar sesión
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
@import url("https://fonts.googleapis.com/css?family=Roboto");
body {
  font-family: "Roboto", sans-serif;
}

.auth__header {
  padding: 13vh 1rem calc(11vh + 35px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  background-image: linear-gradient(#e48532, #c3744d);
  background-size: cover;
  background-position: center center;
  position: relative;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}
.auth__header:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.auth__logo {
  position: relative;
  z-index: 18;
  background: #fff;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.auth__body {
  padding-bottom: 2rem;
}
.auth__form {
  min-width: 280px;
  max-width: 340px;
  margin: auto;
  margin-top: -40px;
  padding: 0 10px;
  position: relative;
  z-index: 9;
}
.auth__form_body {
  padding: 0.7rem 1.5rem 35px;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.auth__form_title {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1.2rem;
}
.auth__form_actions {
  text-align: center;
  padding: 0 2rem;
  margin-top: -25px;
}
.auth__form_actions .btn {
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