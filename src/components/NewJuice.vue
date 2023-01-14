<template>
  <div class="overlay" @click="closeForm">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <div class="juice">
        <div class="juice-info">
          <ErrorMsg v-if="error"/>
          <h2>@{{ user.element.name }}</h2>
          <p>{{ calculateDate() }}</p>
          <input type="text" style="text-align:left" v-model="juice.text">
          <div class="juice-meta form" @submit.prevent="postJuice">
            <button type="submit" class="like-button btn btn-outline-primary">
              <span>Publicar</span>
            </button>
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
        juice: {
          text: '',
          date: this.calculateDate(),
        }
      }
    },
    methods: {
        calculateDate() {
          let ahora = Date.now();
          let fecha = new Date(ahora);
          return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`;
        },
        postJuice() {
          this.$store.dispatch('storeJuice', this.juice);
          this.$store.dispatch('postJuice');
        },
        closePage() {
          this.$store.dispatch('setNewJuice', false);
        }
    },
    components: {
        ErrorMsg
    },
    created() {
      this.$store.dispatch('getUser');
    },
    computed: {
      ...mapGetters(['user', 'error'])
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
</style>
  
  