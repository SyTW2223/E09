<template>
      <div class="juice">
        <div class="juice-info">
          <h3>@{{ userName }}</h3>
          <p>{{ date }}</p>
          <p>{{ text }}</p>
          <div class="juice-meta">
            <button v-if="loggedUser && loggedUser.name == userName" class="delete-button btn btn-outline-primary" @click="deleteJuice">
              <span>🗑 Eliminar</span>
            </button>
            <button v-if="loggedUser" class="like-button btn btn-outline-primary">
              <span>♡ {{ likes }}</span>
            </button>
            <p v-else>♡ {{ likes }}</p>
          </div>
        </div>
      </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'JuiceComponent',
    computed: {
      ...mapGetters(['loggedUser', 'error', 'userName', 'date', 'text', 'likes', 'juice_id'])
    },
    methods: {
      deleteJuice() {
        this.$store.dispatch('deleteJuice', this.juice_id);
        this.$store.dispatch('setJuicePage', false);
      }
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