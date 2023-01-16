<template>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <div class="juice">
        <div class="juice-info">
          <ErrorMsg v-if="error" class="error"/>
          <h3>@{{ loggedUser.name }}</h3>
          <p>{{ calculateDate() }}</p>
          <div class="juice-meta form">
            <form class="form" @submit.prevent="postJuice">
              <input type="text" style="text-align:left" v-model="text" required><br/><br/>
              <input type="submit" class="like-button btn btn-outline-primary">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ErrorMsg from './ErrorMsg.vue'
  import { mapGetters } from 'vuex';
  export default {
    name: 'NewJuice',
    data() {
      return {
        text: ''
      }
    },
    methods: {
        calculateDate() {
          let ahora = Date.now();
          let fecha = new Date(ahora);
          return `${('0' + fecha.getDate()).slice(-2)}/${('0' + (fecha.getMonth() + 1)).slice(-2)}/${fecha.getFullYear()} `+
            `${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}`;
        },
        postJuice() {
          this.$store.dispatch('setJuice', {
            userName: this.loggedUser.name,
            text: this.text,
            date: this.calculateDate(),
            likes: 0
          });
          this.$store.dispatch('postJuice');
        },
        closePage() {
          this.$store.dispatch('setNewJuice', false);
        }
    },
    components: {
        ErrorMsg
    },
    computed: {
      ...mapGetters(['loggedUser', 'error'])
    }
  }
</script>
  
<style> 
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .form-container {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 3;
  }
  .boton-cerrar {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: white;
  }
  .error {
    max-width: 535px;
  }
</style>
  
  