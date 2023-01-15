<template>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <div class="juice">
        <div class="juice-info">
          <ErrorMsg v-if="error" class="error"/>
          <h2>@{{ name }}</h2>
          <p>{{ calculateDate() }}</p>
          <div class="juice-meta form">
            <form class="submit" @submit.prevent="postJuice">
              <input type="text" style="text-align:left" v-model="text">
              <button type="submit" class="like-button btn btn-outline-primary">
                <span>Publicar</span>
              </button>
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
          console.log(this.id);
          this.$store.dispatch('storeJuice', {
            userId: this.id,
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
      ...mapGetters(['name', 'error', 'id'])
    }
  }
</script>
  
<style> 
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Color de fondo con transparencia */
    z-index: 1; /* Poner el overlay encima de la página */
  }
  .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centrar el formulario en la pantalla */
    background-color: white;
    padding: 20px;
    z-index: 2; /* Poner el formulario encima del overlay */
  }
  .boton-cerrar {
    position: absolute; /* para posicionar el botón en relación al contenedor */
    top: 10px; /* posición en la parte superior del contenedor */
    right: 10px; /* posición a la derecha del contenedor */
    border: none;
    background-color: white;
  }
  .error {
    max-width: 535px;
  }
</style>
  
  