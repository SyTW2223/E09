<template>
  <div class="overlay">
    <div class="juice-box form-container">
      <button class="boton-cerrar" @click="closePage">✖</button>
      <div class="juice">
        <div class="juice-info">
          <ErrorMsg v-if="error" class="error"/>
          <h3>@{{ userName }}</h3>
          <p>{{ date }}</p>
          <p>{{ text }}</p>
          <div class="juice-meta">
            <button v-if="loggedUser" class="like-button btn btn-outline-primary">
              <span>♡ {{ likes }}</span>
            </button>
            <p v-else>♡ {{ likes }}</p>
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
    name: 'JuiceComponent',
    methods: {
      closePage() {
        this.$store.dispatch('setJuicePage', false);
      }
    },
    components: {
      ErrorMsg
    },
    computed: {
      ...mapGetters(['loggedUser', 'error', 'userName', 'date', 'text', 'likes'])
    }
  }
</script>
  
       
<style>
  .juice-box {
    width: 600px;
    margin: 50px auto;
    box-shadow: 0px 0px 5px;
    padding: 20px;
    padding-top: 10px;
    border-radius: 10px;
  }
  .juice-info {
    margin-top: 10px;
    text-align: left;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .btn-outline-primary {
    color: #000000 !important;
    outline-color: #000000;
    border-color: #000000;
    lighting-color: #f31b0b;
    background-color: #ff898173;

  }
  .btn-outline-primary:hover {
    background-color: #ff8981ce;
    border-color: #000000;
  }
  .btn-outline-primary:active {
    background-color: #fc0606ce;
  }
</style>